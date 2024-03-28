import db from "../db/models";
import { OrderOutput } from "../db/models/order"
import { callbackType } from "../helpers/Helpers"
import { CustomError } from "../middleware/error-handler";
import { createSesEncrypt, createShaEncrypt, createSesDecrypt } from "../helpers/payment-helpers"

const orders: { [key: number | string]: any } = {}
const {
  MerchantID,
  Version,
  PayGateWay,
  NotifyUrl,
  ReturnUrl,
  ClientBackURL
} = process.env;

const orderService = {
  orderEncryption: async (data: any, cb: callbackType<any>) => {
    try {
      const TimeStamp: number = Math.round(new Date().getTime() / 1000);
      const order = {
        ...data,
        ItemDesc: TimeStamp,
        TimeStamp,
        Amt: parseInt(data.order.totalPrice),
        MerchantOrderNo: TimeStamp,
      }
      const provider = data.payment.provider
      if (provider === '貨到付款') {
        order.WEBATM = 1
      } else if (provider === '信用卡') {
        order.CREDIT = 1
      }
      const aesEncrypt = createSesEncrypt(order);
      const shaEncrypt = createShaEncrypt(aesEncrypt);
      order.aesEncrypt = aesEncrypt;
      order.shaEncrypt = shaEncrypt;
      orders[TimeStamp] = order;
      return cb(null, order)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return cb(error)
      }
    }
  },
  checkOrder: async (id: string, cb: callbackType<any>) => {
    const order = orders[id]
    if (!order) {
      return cb(new CustomError('Order Not Find', 404))
    }
    const data: any = {
      PayGateWay,
      Version,
      order,
      MerchantID,
      NotifyUrl,
      ReturnUrl,
      ClientBackURL,
      CREDIT: order.CREDIT,
      WEBATM: order.WEBATM
    }
    return cb(null, data)
  },
  PaymentCallback: async (response: any, cb: callbackType<any>) => {
    try {
      //解密
      const data = createSesDecrypt(response.TradeInfo);
      // 取得交易內容，並查詢本地端資料庫是否有相符的訂單
      if (!orders[data?.Result?.MerchantOrderNo]) {
        console.log('找不到訂單');
        return cb(null)
      }
      // 使用 HASH 再次 SHA 加密字串，確保比對一致（確保不正確的請求觸發交易成功）
      const thisShaEncrypt = createShaEncrypt(response.TradeInfo);
      if (!thisShaEncrypt === response.TradeSha) {
        console.log('付款失敗：TradeSha 不一致');
        return cb(null)
      }
      // 交易完成，將成功資訊儲存於資料庫
      console.log('付款完成，訂單：', orders[data?.Result?.MerchantOrderNo]);
      return cb(null)
    } catch (error: unknown) {
      if (error instanceof Error)
        cb(error)
    }
  },

  postOrder: async (
    user: typeof db.User,
    order: {
      userId: number;
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
    shippingFeeId: number,
    cb: callbackType<OrderOutput>) => {
    const t = await db.sequelize.transaction()
    try {

      const oneHourAgo = new Date(new Date().getTime() - (60 * 5 * 1000))
      const existingOrder = await db.Order.findOne({
        where: {
          userId: user.id,
          totalPrice: order.totalPrice,
          status: order.status,
          createdAt: {
            [db.Sequelize.Op.gte]: oneHourAgo
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

      const skuQueries = orderItems.map(item => {
        return db.Sku.findOne({
          where: { id: item.skuId }
        }, { transaction: t })
      })
      const skuResults = await Promise.all(skuQueries)

      if (skuResults.some(sku => !sku)) {
        return cb(new CustomError('One or more SKUs not found', 404))
      }
      const orderResult = await db.Order.create({
        ...order,
        userId: user.id,
        shippingFeeId: shippingFeeId,
      }, { transaction: t })

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
      await t.commit()

      return cb(null, orderResult)
    } catch (error: unknown) {
      await t.rollback()
      if (error instanceof Error) {
        cb(error)
      }
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