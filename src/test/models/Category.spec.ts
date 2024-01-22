const { sequelize, Sequelize } = require('sequelize-test-helpers')
import proxyquire from 'proxyquire'
import db from '../../db/models'
import { expect } from 'chai'
import sinonChai from 'sinon-chai'
import chai from 'chai'
chai.use(sinonChai)

describe('# Category Model', () => {
  const { DataTypes } = Sequelize
  const categoryInit = proxyquire('../../db/models/category', {
    sequelize: Sequelize
  })
  let Category: typeof db.Category
  before(() => {
    Category = categoryInit.default(sequelize)
  })
  after(() => {
    Category.init.resetHistory()
  })
  context('properties', () => {
    it('called Category.init with the correct parameters', () => {
      expect(Category.init).to.have.been.calledWithMatch(
        {
          name: { type: DataTypes.STRING }
        }
      )
    })
  })

  context('associations', () => {
    const Product = 'Product'
    before(() => {
      Category.associate({ Product })
    })
    it('should have many products', () => {
      expect(Category.hasMany).to.be.been.calledWith(Product)
    })
  })

  context('action', () => {
    let data: typeof db.category
    it('create', async () => {
      const res = await db.Category.create({
        name: 'category'
      })
      data = res
    })
    it('read', async () => {
      const category = await db.Category.findByPk(data.id)
      expect(data.id).to.be.equal(category.id)
    })
    it('update', async () => {
      await db.Category.update({}, { where: { id: data.id } })
      const category = await db.Category.findByPk(data.id)
      expect(data.updatedAt).to.be.not.equal(category.updatedAt)
    })
    it('delete', async () => {
      await db.Category.destroy({ where: { id: data.id } })
      const category = await db.User.findByPk(data.id)
      expect(category).to.be.equal(null)
    })
  })
})