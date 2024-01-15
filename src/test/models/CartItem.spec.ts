const { sequelize, Sequelize } = require('sequelize-test-helpers')
import proxyquire from 'proxyquire'
import db from '../../db/models'
import { expect } from 'chai'
import sinonChai from 'sinon-chai'
import chai from 'chai'
import { CartItemOutput } from '../../db/models/cartItem'

chai.use(sinonChai)

describe('# CartItem Model', () => {
  const { DataTypes } = Sequelize
  const cartItemInit = proxyquire('../../db/models/cartItem', {
    sequelize: Sequelize
  })

  let CartItem: typeof db.CartItem
  let user: typeof db.User
  let cart: typeof db.Cart
  let category: typeof db.Category
  let product: typeof db.Product

  before(async () => {
    CartItem = cartItemInit.default(sequelize)
    const userRes = await db.User.create({
      email: 'user@email.com',
      password: 'password',
      phone: '00000000'
    })
    user = userRes
    const cartRes = await db.Cart.create({
      userId: user.id
    })
    cart = cartRes
    const categoryRes = await db.Category.create({
      name: 'category'
    })
    category = categoryRes
    const productRes = await db.Product.create({
      name: 'T-shirt',
      price: 999,
      image: "http://image",
      sizeOptions: "S",
      quantity: 2,
      description: "kpop style",
      additionalImage: "http://additionalImage",
      categoryId: categoryRes.id
    })
    product = productRes
  })
  after(async () => {
    if (product) {
      await db.Product.destroy({ where: { id: product.id } })
    }
    if (category) {
      await db.Category.destroy({ where: { id: category.id } })
    }
    if (cart) {
      await db.Cart.destroy({ where: { id: cart.id } })
    }
    if (user) {
      await db.User.destroy({ where: { id: user.id } })
    }
    CartItem.init.resetHistory()
  })
  context('properties', () => {
    it('called CartItem.init with the correct parameters', () => {
      expect(CartItem.init).to.have.been.calledWithMatch(
        {
          quantity: { type: DataTypes.INTEGER }
        }
      )
    })
  })

  context('action', () => {
    let data: CartItemOutput
    it('create', async () => {
      const res = await db.CartItem.create({
        cartId: cart.id,
        productId: product.id,
        quantity: 1
      })
      data = res
    })
    it('read', async () => {
      const cartItem = await db.CartItem.findByPk(data.id)
      expect(data.id).to.be.equal(cartItem.id)
    })
    it('update', async () => {
      await db.CartItem.update({}, { where: { id: data.id } })
      const cartItem = await db.CartItem.findByPk(data.id)
      expect(data.updatedAt).to.be.not.equal(cartItem.updatedAt)
    })
    it('delete', async () => {
      await db.CartItem.destroy({ where: { id: data.id } })
      const cartItem = await db.Cart.findByPk(data.id)
      expect(cartItem).to.be.equal(null)
    })
  })
})