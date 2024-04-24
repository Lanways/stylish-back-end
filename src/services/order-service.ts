import db from "../db/models";
import { OrderOutput } from "../db/models/order"
import { callbackType } from "../helpers/Helpers"
import { CustomError } from "../middleware/error-handler";
import { createSesEncrypt, createShaEncrypt, createSesDecrypt } from "../helpers/payment-helpers"

interface OrderInterface {
  ItemDesc: number,
  TimeStamp: number
  Amt: number
  MerchantOrderNo: number
  email: string,
  WEBATM?: number
  CREDIT?: number
  aesEncrypt?: string
  shaEncrypt?: string
}

const orderService = {
  orderEncryption: async (user: typeof db.User,
    order: {
      totalPrice: number;
      status: string;
    },
    shipping: {
      recipient: string;
      address: string;
      telephone: string;
    },
    payment: {
      amount: number;
      provider: string;
      status: string;
    },
    orderItems: Array<{
      skuId: number;
      quantity: number;
    }>,
    shippingFeeId: number, email: string, cb: callbackType<any>) => {
    const t = await db.sequelize.transaction()
    try {
      //查詢已存在訂單，避免重複送出訂單
      const fiveMinAgo = new Date(new Date().getTime() - (60 * 5 * 1000))

      const existingOrder = await db.Order.findOne({
        where: {
          userId: user.id,
          totalPrice: order.totalPrice,
          status: order.status,
          createdAt: {
            [db.Sequelize.Op.gte]: fiveMinAgo
          }
        },
        include: [{
          model: db.OrderItem,
          attributes: ['skuId', 'quantity']
        }]
      })
      if (existingOrder) {
        const existingOrderJson = existingOrder.toJSON()
        const isLengthEqual = orderItems.length === existingOrderJson.OrderItems.length
        const sameArr = isLengthEqual && orderItems.every((element, index) => {
          const correspondingElement = existingOrderJson.OrderItems[index]
          return element.skuId === correspondingElement.skuId && element.quantity === correspondingElement.quantity
        })
        if (existingOrder && sameArr) {
          return cb(new CustomError('A similar pending order already exists', 409))
        }
      }

      //確認每個orderItems的sku存在
      const skuQueries = orderItems.map(item => {
        return db.Sku.findOne({
          where: { id: item.skuId }
        }, { transaction: t })
      })
      const skuResults = await Promise.all(skuQueries)
      if (skuResults.some(sku => !sku)) {
        return cb(new CustomError('One or more SKUs not found', 404))
      }
      //透過事務寫入訂單
      const orderResult = await db.Order.create({
        ...order,
        userId: user.id,
        shippingFeeId: shippingFeeId,
        provider: payment.provider,
        email: email
      }, { transaction: t })
      if (!orderResult) {
        console.log('failed to create order')
      }
      await db.Shipping.create({
        ...shipping,
        orderId: orderResult.id
      }, { transaction: t })

      await db.Payment.create({
        ...payment,
        orderId: orderResult.id
      }, { transaction: t })

      const orderItemsResult = orderItems.map(item =>
        db.OrderItem.create({
          ...item,
          orderId: orderResult.id
        }, { transaction: t })
      )
      await Promise.all(orderItemsResult)
      
      //生成Unix 時間戳
      const TimeStamp: number = orderResult.createdAt.getTime()
      //order加密
      const requiredTradeInfo: OrderInterface = {
        ItemDesc: TimeStamp,
        TimeStamp,
        Amt: orderResult.totalPrice,
        MerchantOrderNo: TimeStamp,
        email: orderResult.email,
      }

      if (payment.provider === '貨到付款') {
        requiredTradeInfo['WEBATM'] = 1
      } else if (payment.provider === '信用卡') {
        requiredTradeInfo['CREDIT'] = 1
      }

      const aesEncrypt = createSesEncrypt(requiredTradeInfo)
      const shaEncrypt = createShaEncrypt(aesEncrypt)
      await orderResult.update({
        aesEncrypt: aesEncrypt,
        shaEncrypt: shaEncrypt
      }, { transaction: t })

      await t.commit()
      return cb(null, { TimeStamp })
    } catch (error: unknown) {
      await t.rollback()
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  checkOrder: async (TimeStamp: string, cb: callbackType<any>) => {
    const dateFromTimestamp = new Date(parseInt(TimeStamp));
    const order = await db.Order.findOne({
      where: {
        createdAt: dateFromTimestamp
      }
    })
    if (!order) {
      return cb(new CustomError('Order Not Find', 404))
    }
    const data: any = {
      aesEncrypt: order.aesEncrypt,
      shaEncrypt: order.shaEncrypt,
      MerchantID: process.env.MerchantID,
      PayGateWay: process.env.PayGateWay,
      Version: process.env.Version
    }
    const provider = order.provider
    if (provider === '貨到付款') {
      data['WEBATM'] = 1
    } else if (provider === '信用卡') {
      data['CREDIT'] = 1
    }
    return cb(null, data)
  },
  PaymentCallback: async (response: any, cb: callbackType<any>) => {
    try {
      //解密
      const data = createSesDecrypt(response.TradeInfo);
      const date = new Date(Number(data.Result.MerchantOrderNo))
      // 取得交易內容，並查詢本地端資料庫是否有相符的訂單
      const order = await db.Order.findOne({
        where: { createdAt: date }
      })
      if (!order) {
        return cb(new CustomError('Order Not Find', 404))
      }
      // 使用 HASH 再次 SHA 加密字串，確保比對一致（確保不正確的請求觸發交易成功）
      const thisShaEncrypt = createShaEncrypt(response.TradeInfo);
      if (!thisShaEncrypt === response.TradeSha) {
        console.log('付款失敗：TradeSha 不一致')
        await order.update({
          status: 'Cancelled'
        })
        return cb(null)
      }
      // 交易完成，將成功資訊儲存於資料庫
      console.log('付款完成，訂單：')
      await order.update({
        status: 'Processing'
      })
      return cb(null)
    } catch (error: unknown) {
      if (error instanceof Error)
        cb(error)
    }
  },
  getOrders: async (cb: callbackType<OrderOutput>) => {
    try {
      const orders = await db.Order.findAll({
        include: [
          { model: db.Payment, attributes: ['id', 'status'] },
          { model: db.Shipping, attributes: ['id'] },
          { model: db.OrderItem, attributes: ['id', 'skuId', 'quantity'] }
        ]
      })
      if (orders.length === 0) {
        return cb(new CustomError('internal server error', 500))
      }
      return cb(null, orders)
    } catch (error: unknown) {
      if (error instanceof Error) {
        cb(error)
      }
    }
  }
}

export default orderService