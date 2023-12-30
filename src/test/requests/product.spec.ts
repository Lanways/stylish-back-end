import request from "supertest"
import db from "../../db/models"
import app from "../../app"
import chai, { expect } from 'chai'
import sinonChai from "sinon-chai"
chai.use(sinonChai)
const should = chai.should()

describe('# product requests', () => {

  context('# POST', () => {
    describe('POST /api/product', () => {
      let categoryId: string
      before(async () => {
        //清除測試資料
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
        const category = await db.Category.create({ name: 'category' })
        categoryId = category.id
      })

      it(' - successfully', async () => {
        const res = await request(app)
          .post('/api/product')
          .send({
            name: 'name',
            price: 999,
            image: "http://image",
            sizeOptions: "S",
            quantity: 2,
            description: 'description',
            additionalImage: "http://additionalImage",
            categoryId: categoryId
          })
          .set('Accept', 'application/json')
          .expect(200)
        const productId = res.body.data.id
        const product = await db.Product.findByPk(productId)
        product.name.should.equal('name')
        product.price.should.equal('999')
        product.image.should.equal('http://image')
        product.sizeOptions.should.equal('S')
        product.quantity.should.equal(2)
        product.description.should.equal('description')
        product.additionalImage.should.equal('http://additionalImage')
      })

      after(async () => {
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })
  })

  context('# GET', () => {
    describe('GET /api/product', () => {
      let createdProductId: string
      before(async () => {
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
        const category = await db.Category.create({ name: 'category' })
        const createdProduct = await db.Product.create({
          name: 'name',
          price: 999,
          image: "http://image",
          sizeOptions: "S",
          quantity: 2,
          description: 'description',
          additionalImage: "http://additionalImage",
          categoryId: category.id
        })
        createdProductId = createdProduct.id
      })
      //GET /product
      it(' - successfully', async () => {
        const res = await request(app)
          .get('/api/product')
          .set('Accept', 'application/json')
          .expect(200)
        expect(res.body.data).to.be.an('array')
      })
      //GET /product/:id
      it(' - successfully', async () => {
        const res = await request(app)

          .get(`/api/product/${createdProductId}`)
          .set('Accept', 'application/json')
          .expect(200)
        expect(res.body.data).to.be.an('object')
      })
      after('', async () => {
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })
  })

  context('# PUT', () => {
    describe('PUT /api/product', () => {
      let createdProductId: string
      let categoryId: string
      before(async () => {
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
        const category = await db.Category.create({ name: 'category' })
        categoryId = category.id
        const createdProduct = await db.Product.create({
          name: 'name',
          price: 999,
          image: "http://image",
          sizeOptions: "S",
          quantity: 2,
          additionalImage: "http://additionalImage",
          categoryId: categoryId
        })
        createdProductId = createdProduct.id
      })
      it('- successfully', async () => {
        const res = await request(app)
          .put(`/api/product/${createdProductId}`)
          .send({
            name: 'putName',
            price: 999,
            image: "http://image",
            sizeOptions: "S",
            quantity: 2,
            additionalImage: "http://additionalImage",
            categoryId: categoryId
          })
          .set('Accept', 'application/json')
          .expect(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.be.include({
          status: '200',
          message: 'OK'
        })
        expect(res.body.data.name).to.be.equal('putName')
        const productId = res.body.data.id
        const updateProduct = await db.Product.findByPk(productId)
        expect(updateProduct.name).to.equal('putName')
      })
      after(async () => {
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })
  })

  context('# DELETE', () => {
    describe('DELETE /api/product', () => {
      let createdProductId: string
      before(async () => {
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
        const category = await db.Category.create({ name: 'category' })
        const createdProduct = await db.Product.create({
          name: 'name',
          price: 999,
          image: "http://image",
          sizeOptions: "S",
          quantity: 2,
          description: 'description',
          additionalImage: "http://additionalImage",
          categoryId: category.id
        })
        createdProductId = createdProduct.id
      })
      it('- successfully', async () => {
        const res = await request(app)
          .delete(`/api/product/${createdProductId}`)
          .set('Accept', 'appilcation/json')
          .expect(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.be.include({
          status: '200',
          message: 'OK'
        })
        expect(res.body.data).to.be.include({
          name: 'name',
          price: '999',
          image: "http://image",
          sizeOptions: "S",
          quantity: 2,
          description: 'description',
          additionalImage: "http://additionalImage"
        })
        const deletedProduct = await db.Product.findByPk(createdProductId)
        expect(deletedProduct).to.be.null
      })
      after(async () => {
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })
  })
})