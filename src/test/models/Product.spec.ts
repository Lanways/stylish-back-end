import chai from "chai";
import proxyquire from 'proxyquire'
import sinonChai from "sinon-chai"
import { expect } from 'chai'
chai.use(sinonChai)
const { sequelize, Sequelize } = require('sequelize-test-helpers')
import db from "../../db/models"

describe('# Product Model', () => {
  const { DataTypes } = Sequelize
  const productInit = proxyquire('../../db/models/product', {
    sequelize: Sequelize
  })

  let Product: typeof db.Product

  before(async () => {
    Product = productInit.default(sequelize)
  })

  after(async () => {
    await db.Product.destroy({ where: {} })
    await db.Category.destroy({ where: {} })
    Product.init.resetHistory()
  })

  context('properties', () => {
    it('called Product.init with the correct parameters', () => {
      expect(Product.init).to.have.been.calledWithMatch(
        {
          name: { type: DataTypes.STRING },
          price: { allowNull: false, type: DataTypes.STRING },
          image: { allowNull: false, type: DataTypes.STRING },
          description: { allowNull: true, type: DataTypes.TEXT },
          additionalImage: { allowNull: false, type: DataTypes.TEXT },
          categoryId: { allowNull: false, type: DataTypes.INTEGER }
        }
      )
    })
  });

  context('associations', () => {
    const Category = 'Category'
    const Sku = 'Sku'
    before(() => {
      Product.associate({ Category })
      Product.associate({ Sku })
    })
    it('should belong to Categories', () => {
      expect(Product.belongsTo).to.be.have.been.calledWith(Category)
    })
    it('should have many Skus', () => {
      expect(Product.hasMany).to.be.have.been.calledWith(Sku)
    })
  })

  context('action', () => {
    let data: typeof db.Product
    let category: typeof db.Category
    before(async () => {
      const res = await db.Category.create({ name: 'category' })
      category = res
    })
    it('create', async () => {
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
      data = product
    })
    it('read', async () => {
      const product = await db.Product.findByPk(data!.id)
      expect(data!.id).to.be.equal(product.id)
    })
    it('update', async () => {
      await db.Product.update({}, { where: { id: data!.id } })
      const product = await db.Product.findByPk(data!.id)
      expect(data!.updatedAt).to.be.not.equal(product.updatedAt)
    })
    it('delete', async () => {
      await db.Product.destroy({ where: { id: data!.id } })
      const product = await db.Product.findByPk(data!.id)
      expect(product).to.be.equal(null)
    })
  })

})