import { expect } from "chai"
import db from "../../db/models"
import proxyquire from 'proxyquire'
const { Sequelize, sequelize } = require('sequelize-test-helpers')
import chai from "chai"
import sinonChai from "sinon-chai"
chai.use(sinonChai)
import sinon from 'sinon'

describe('# Sku Model', () => {

  const SkuInit = proxyquire('../../db/models/Sku', {
    sequelize: Sequelize
  })
  const { DataTypes } = Sequelize

  let Sku: typeof db.Sku
  let Product: typeof db.Product

  before(async () => {
    Sku = SkuInit.default(sequelize)
    sinon.spy(db.Sku, 'belongsTo');
    const category = await db.Category.create({ name: 'category' })
    const res = await db.Product.create({
      name: "product",
      price: "99",
      image: "imgae",
      additionalImage: "additionalImage",
      categoryId: category.id
    })
    Product = res
  })

  after(async () => {
    await db.Sku.destroy({ where: {} })
    await db.Product.destroy({ where: {} })
    await db.Category.destroy({ where: {} })
    Sku.init.resetHistory()
    db.Sku.belongsTo.restore()
  })

  context('properties', () => {
    it('called Sku.init with the correct parameters', () => {
      expect(Sku.init).to.have.been.calledWithMatch(
        {
          skuCode: { type: DataTypes.STRING }
        }
      )
    })
  })

  context('associations', () => {
    before(() => {
      db.Sku.associate(db)
    })
    it('should belong to product', () => {
      expect(db.Sku.belongsTo).to.have.been.calledWith(db.Product)
    })
  })

  context('action', () => {
    let data: typeof db.Sku
    it('create', async () => {
      const res = await db.Sku.create({
        productId: Product.id,
        skuCode: 'skuCode',
        price: 1,
        inventoryQuantity: 1,
        color: 'black',
        size: 'S'
      })
      data = res
    })
    it('read', async () => {
      const Sku = await db.Sku.findByPk(data.id)
      expect(data.id).to.be.equal(Sku.id)
    })
    it('update', async () => {
      await data.update({})
      const Sku = await db.Sku.findByPk(data.id)
      expect(data.updatedAt).to.be.not.equal(Sku.updatedAt)
    })
    it('delete', async () => {
      await data.destroy()
      const Sku = await db.Sku.findByPk(data.id)
      expect(Sku).to.be.equal(null)
    })
  })
})