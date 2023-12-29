import chai from "chai";
import proxyquire from 'proxyquire'
import sinonChai from "sinon-chai"
import { expect } from 'chai'
chai.use(sinonChai)
const { sequelize, Sequelize } = require('sequelize-test-helpers')
import db from "../../db/models"
import { ProductOutput } from "../../db/models/product"

describe('# Product Model', () => {
  const { DataTypes } = Sequelize
  const productInit = proxyquire('../../db/models/product', {
    sequelize: Sequelize
  })

  let Product: typeof db.Product
  let category: typeof db.Category

  before(async () => {
    Product = productInit.default(sequelize)
    const res = await db.Category.create({ name: 'category' })
    category = res
  })

  after(async () => {
    if (category) {
      await db.Category.destroy({ where: { id: category.id } })
    }
    Product.init.resetHistory()
  })

  context('properties', () => {
    it('called Product.init with the correct parameters', () => {
      expect(Product.init).to.have.been.calledWithMatch(
        {
          name: { type: DataTypes.STRING }
        }
      )
    })
  });

  context('action', () => {
    let data: ProductOutput | null = null

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