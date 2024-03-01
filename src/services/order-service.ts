import db from "../db/models";
import { OrderOutput } from "../db/models/order"
import { callbackType } from "../helpers/Helpers"
import { CustomError } from "../middleware/error-handler";

const orderService = {
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