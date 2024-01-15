const { sequelize, Sequelize } = require('sequelize-test-helpers')
import proxyquire from 'proxyquire'
import db from '../../db/models'
import { expect } from 'chai'
import sinonChai from 'sinon-chai'
import chai from 'chai'
import { CartOutput } from '../../db/models/cart'
chai.use(sinonChai)

describe('# Cart Model', () => {
  const { DataTypes } = Sequelize
  const cartInit = proxyquire('../../db/models/cart', {
    sequelize: Sequelize
  })

  let Cart: typeof db.Cart
  let user: typeof db.User

  before(async () => {
    Cart = cartInit.default(sequelize)
    const res = await db.User.create({
      email: 'user@email.com',
      password: 'password',
      phone: '00000000'
    })
    user = res
  })
  after(async () => {
    if (user) {
      await db.User.destroy({ where: { id: user.id } })
    }
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

  context('action', () => {
    let data: CartOutput
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