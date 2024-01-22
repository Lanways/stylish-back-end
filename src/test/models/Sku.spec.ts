import { expect } from "chai"
import db from "../../db/models"
import proxyquire from 'proxyquire'
const { Sequelize, sequelize } = require('sequelize-test-helpers')
import chai from "chai"
import sinonChai from "sinon-chai"
chai.use(sinonChai)

describe('# Sku Model', () => {

  const SkuInit = proxyquire('../../db/models/sku', {
    sequelize: Sequelize
  })
  const { DataTypes } = Sequelize
  let Sku: typeof db.Sku

  before(async () => {
    Sku = SkuInit.default(sequelize)
  })

  after(async () => {
    await db.Sku.destroy({ where: {} })
    await db.Product.destroy({ where: {} })
    await db.Category.destroy({ where: {} })
    Sku.init.resetHistory()
  })

  context('properties', () => {
    it('called Sku.init with the correct parameters', () => {
      expect(Sku.init).to.have.been.calledWithMatch(
        {
          productId: { allowNull: false, type: DataTypes.INTEGER },
          skuCode: { allowNull: false, type: DataTypes.STRING },
          price: { allowNull: false, type: DataTypes.INTEGER },
          inventoryQuantity: { allowNull: false, type: DataTypes.INTEGER },
          color: { allowNull: false, type: DataTypes.STRING },
          size: { allowNull: false, type: DataTypes.STRING }
        }
      )
    })
  })

  context('associations', () => {
    const Product = 'Product'
    const CartItem = 'CartItem'
    before(() => {
      Sku.associate({ Product })
      Sku.associate({ CartItem })
    })
    it('should have many CartItem', () => {
      expect(Sku.hasMany).to.have.been.calledWith(CartItem)
    })
    it('should belong to product', () => {
      expect(Sku.belongsTo).to.have.been.calledWith(Product)
    })
  })

  context('action', () => {
    let data: typeof db.Sku
    let Product: typeof db.Product
    before(async () => {
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