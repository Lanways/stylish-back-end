const { sequelize, Sequelize } = require('sequelize-test-helpers')
import proxyquire from 'proxyquire'
import db from '../../db/models'
import { expect } from 'chai'
import sinonChai from 'sinon-chai'
import chai from 'chai'
chai.use(sinonChai)

describe('# Cart Model', () => {
  const { DataTypes } = Sequelize
  const cartInit = proxyquire('../../db/models/cart', {
    sequelize: Sequelize
  })

  let Cart: typeof db.Cart

  before(async () => {
    Cart = cartInit.default(sequelize)
  })
  after(async () => {
    await db.User.destroy({ where: {} })
    Cart.init.resetHistory()
  })
  context('properties', () => {
    it('called Cart.init with the correct parameters', () => {
      expect(Cart.init).to.have.been.calledWithMatch(
        {
          userId: { type: DataTypes.INTEGER }
        }
      )
    })
  })

  context('associations', () => {
    const User = 'User'
    const CartItem = 'CartItem'
    before(() => {
      Cart.associate({ User })
      Cart.associate({ CartItem })
    })
    it('should belong to User', () => {
      expect(Cart.belongsTo).to.have.been.calledWith(User)
    })
    it('should have many CartItem', () => {
      expect(Cart.hasMany).to.have.been.calledWith(CartItem)
    })
  })

  context('action', () => {
    let data: typeof db.Cart
    let user: typeof db.User

    before(async () => {
      const res = await db.User.create({
        email: 'user@email.com',
        password: 'password',
        phone: '00000000'
      })
      user = res
    })
    it('create', async () => {
      const res = await db.Cart.create({
        userId: user.id
      })
      data = res
    })
    it('read', async () => {
      const cart = await db.Cart.findByPk(data.id)
      expect(data.id).to.be.equal(cart.id)
    })
    it('update', async () => {
      await db.Cart.update({}, { where: { id: data.id } })
      const cart = await db.Cart.findByPk(data.id)
      expect(data.updatedAt).to.be.not.equal(cart.updatedAt)
    })
    it('delete', async () => {
      await db.Cart.destroy({ where: { id: data.id } })
      const cart = await db.Cart.findByPk(data.id)
      expect(cart).to.be.equal(null)
    })
  })
})