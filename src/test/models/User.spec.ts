const { sequelize, Sequelize } = require('sequelize-test-helpers')
import proxyquire from 'proxyquire'
import db from '../../db/models'
import chai from 'chai'
import { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('# User Model', () => {
  const { DataTypes } = Sequelize
  const userInit = proxyquire('../../db/models/user', {
    sequelize: Sequelize
  })

  let User: any

  before(async () => {
    User = userInit.default(sequelize)
  })
  after(async () => {
    User.init.resetHistory()
  })
  context('properties', () => {
    it('called User.init with the correct parameters', () => {
      expect(User.init).to.have.been.calledWithMatch({
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING },
        isAdmin: { type: DataTypes.BOOLEAN }
      })
    })
  })

  context('associations', () => {
    const Cart = 'Cart'
    before(() => {
      User.associate({ Cart })
    })
    it('should have one Cart', () => {
      expect(User.hasOne).to.have.been.calledWith(Cart)
    })
  })

  context('action', () => {
    let data: typeof db.User
    it('create', async () => {
      const res = await db.User.create({
        email: 'mcbluedd@hotmail',
        phone: '0999',
        password: 'password'
      })
      data = res
    })
    it('read', async () => {
      const user = await db.User.findByPk(data.id)
      expect(data.id).to.be.equal(user.id)
    })
    it('update', async () => {
      await db.User.update({}, { where: { id: data.id } })
      const user = await db.User.findByPk(data.id)
      expect(data.updatedAt).to.be.not.equal(user.updatedAt)
    })
    it('delete', async () => {
      await db.User.destroy({ where: { id: data.id } })
      const user = await db.User.findByPk(data.id)
      expect(user).to.be.equal(null)
    })
  })
})