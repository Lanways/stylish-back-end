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
      before(async () => {
        //清除測試資料
        await db.Product.destroy({ where: {}, truncate: true, force: true })
      })

      it(' - successfully', async () => {
        await request(app)
          .post('/api/product')
          .send({
            name: 'name',
            price: 999,
            image: "http://image",
            sizeOptions: "S",
            quantity: 2,
            description: 'description',
            additionalImage: "http://additionalImage"
          })
          .set('Accept', 'application/json')
          .expect(200)
        const product = await db.Product.findByPk(1)
        product.name.should.equal('name')
        product.price.should.equal('999')
        product.image.should.equal('http://image')
        product.sizeOptions.should.equal('S')
        product.quantity.should.equal(2)
        product.description.should.equal('description')
        product.additionalImage.should.equal('http://additionalImage')
      })

      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true, force: true })
      })
    })
  })

  context('# GET', () => {
    describe('GET /api/product', () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true, force: true })
        await db.Product.create({
          name: 'name',
          price: 999,
          image: "http://image",
          sizeOptions: "S",
          quantity: 2,
          description: 'description',
          additionalImage: "http://additionalImage"
        })
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
          .get('/api/product/1')
          .set('Accept', 'application/json')
          .expect(200)
        expect(res.body.data).to.be.an('object')
      })
      after('', async () => {
        await db.Product.destroy({ where: {}, truncate: true, force: true })
      })
    })
  })

  context('# PUT', () => {
    describe('PUT /api/product', () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true, force: true })
        await db.Product.create({
          name: 'name',
          price: 999,
          image: "http://image",
          sizeOptions: "S",
          quantity: 2,
          additionalImage: "http://additionalImage"
        })
      })
      it('- successfully', async () => {
        const res = await request(app)
          .put('/api/product/1')
          .send({
            name: 'putName',
            price: 999,
            image: "http://image",
            sizeOptions: "S",
            quantity: 2,
            additionalImage: "http://additionalImage"
          })
          .set('Accept', 'application/json')
          .expect(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.be.include({
          status: '200',
          message: 'OK'
        })
        expect(res.body.data.name).to.be.equal('putName')
        const updateProduct = await db.Product.findByPk(1)
        expect(updateProduct.name).to.equal('putName')
      })
      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true, force: true })
      })
    })
  })

  context('# DELETE', () => {
    describe('DELETE /api/product', () => {
      before(async () => {
        await db.Product.destroy({ where: {}, truncate: true, force: true })
        await db.Product.create({
          name: 'name',
          price: 999,
          image: "http://image",
          sizeOptions: "S",
          quantity: 2,
          description: 'description',
          additionalImage: "http://additionalImage"
        })
      })
      it('- successfully', async () => {
        const res = await request(app)
          .delete('/api/product/1')
          .set('Appect', 'appilcation/json')
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
        const deletedProduct = await db.Product.findByPk(1)
        expect(deletedProduct).to.be.null
      })
      after(async () => {
        await db.Product.destroy({ where: {}, truncate: true, force: true })
      })
    })
  })
})