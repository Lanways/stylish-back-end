const { sequelize, Sequelize } = require('sequelize-test-helpers')
import proxyquire from 'proxyquire'
import db from '../../db/models'
import { expect } from 'chai'
import sinonChai from 'sinon-chai'
import chai from 'chai'
chai.use(sinonChai)

describe('# CartItem Model', () => {
  const { DataTypes } = Sequelize
  const cartItemInit = proxyquire('../../db/models/cartItem', {
    sequelize: Sequelize
  })

  let CartItem: typeof db.CartItem

  before(async () => {
    CartItem = cartItemInit.default(sequelize)
  })
  after(async () => {
    await db.Sku.destroy({ where: {} })
    await db.Product.destroy({ where: {} })
    await db.Category.destroy({ where: {} })
    await db.Cart.destroy({ where: {} })
    await db.User.destroy({ where: {} })
    CartItem.init.resetHistory()
  })
  context('properties', () => {
    it('called CartItem.init with the correct parameters', () => {
      expect(CartItem.init).to.have.been.calledWithMatch(
        {
          cartId: { allowNull: false, type: DataTypes.INTEGER },
          skuId: { allowNull: false, type: DataTypes.INTEGER },
          quantity: { type: DataTypes.INTEGER }
        }
      )
    })
  })

  context('associations', () => {
    const Cart = 'Cart'
    const Sku = 'Sku'
    before(() => {
      CartItem.associate({ Cart })
      CartItem.associate({ Sku })
    })
    it('should belong to Cart', () => {
      expect(CartItem.belongsTo).to.be.have.calledWith(Cart)
    })
    it('should belong to Sku', () => {
      expect(CartItem.belongsTo).to.be.have.calledWith(Sku)
    })
  })

  context('action', () => {
    let data: typeof db.CartItem
    let cart: typeof db.Cart
    let sku: typeof db.Sku
    before(async () => {
      const user = await db.User.create({
        email: 'user@email.com',
        password: 'password',
        phone: '00000000'
      })
      const cartRes = await db.Cart.create({
        userId: user.id
      })
      cart = cartRes
      const category = await db.Category.create({
        name: 'category'
      })
      const product = await db.Product.create({
        name: 'T-shirt',
        price: 999,
        image: "http://image",
        sizeOptions: "S",
        quantity: 2,
        description: "kpop style",
        additionalImage: "http://additionalImage",
        categoryId: category.id
      })
      const skuRes = await db.Sku.create({
        productId: product.id,
        skuCode: 'skuCode',
        price: 1,
        inventoryQuantity: 1,
        color: 'black',
        size: 'S'
      })
      sku = skuRes
    })
    it('create', async () => {
      const res = await db.CartItem.create({
        cartId: cart.id,
        skuId: sku.id,
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
      const cartItem = await db.CartItem.findByPk(data.id)
      expect(cartItem).to.be.equal(null)
    })
  })
})