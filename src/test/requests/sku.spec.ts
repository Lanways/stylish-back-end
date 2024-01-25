import db from "../../db/models"
import sinon from 'sinon'
import passport from '../../config/passport'
import helpers from "../../helpers/Helpers"
import { Request, Response, NextFunction } from "express"
import request from 'supertest'
import app from "../../app"
import chai, { expect } from "chai"
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
const should = chai.should()

describe('# sku request', () => {
  context('# POST', () => {

    describe('POST /api/sku', () => {
      let productId: number

      before(async function () {
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
        const rootUser = await db.User.create({
          email: 'user@example.com',
          password: 'password',
          phone: '00000000000'
        }); this.authenticate = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          if (typeof callback === 'function') {
            callback(null, { ...rootUser }, undefined)
            return (req: Request, res: Response, next: NextFunction) => { }
          }
        })
        this.getUser = sinon.stub(
          helpers, 'getUser'
        ).returns({ id: 1, isAdmin: true })
        const category = await db.Category.create({ name: 'category' })
        const product = await db.Product.create({ name: 'jacket', price: '1', image: 'http:image', additionalImage: 'http:additionalImage', categoryId: category.id })
        productId = product.id
      })

      afterEach(function () {
        if (this.create) {
          this.create.restore()
        }
      })

      it('- response successfully', function (done) {
        request(app)
          .post('/api/sku')
          .send({
            productId: productId,
            price: 1,
            inventoryQuantity: 1,
            color: 'black',
            size: 'L'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            const data = res.body.data
            expect(data.skuCode).to.equal(`SKU-${productId}-${data.color}-${data.size}`)
            return done()
          })
      })

      it('- database successfully', async () => {
        const sku = await db.Sku.findOne({
          include: [
            { model: db.Product, where: { id: productId } }
          ]
        })
        sku.price.should.equal(1)
        sku.productId.should.equal(productId)
      })

      it('- should handle database errors', function (done) {
        this.create = sinon.stub(db.Sku, 'findOne').throws(new Error('database error'))
        request(app)
          .post('/api/sku')
          .send({
            productId: productId,
            price: 1,
            inventoryQuantity: 1,
            color: 'black',
            size: 'S'
          })
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('database error')
            return done()
          })
      })

      it('- should handle sku already exists error', function (done) {
        request(app)
          .post('/api/sku')
          .send({
            productId: productId,
            price: 1,
            inventoryQuantity: 1,
            color: 'black',
            size: 'L'
          })
          .set('Accept', 'application/json')
          .expect(409)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).to.equal('sku already exists')
            return done()
          })
      })

      it('- should handle product does not exists error', function (done) {
        request(app)
          .post('/api/sku')
          .send({
            productId: `${productId + 1}`,
            price: 1,
            inventoryQuantity: 1,
            color: 'black',
            size: 'L'
          })
          .set('Accept', 'application/json')
          .expect(404)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).to.equal('product does not exists')
            return done()
          })
      })

      after(async function () {
        this.authenticate.restore()
        this.getUser.restore()
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })
  })

  context('# GET', () => {

    describe('GET /api/sku/:id', () => {
      let skuId: number
      let skuCode: string
      before(async function () {
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
        const rootUser = await db.User.create({
          email: 'user@example.com',
          password: 'password',
          phone: '00000000000'
        }); this.authenticate = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          if (typeof callback === 'function') {
            callback(null, { ...rootUser }, undefined)
            return (req: Request, res: Response, next: NextFunction) => { }
          }
        })
        this.getUser = sinon.stub(
          helpers, 'getUser'
        ).returns({ id: 1, isAdmin: true })
        const category = await db.Category.create({ name: 'category' })
        const product = await db.Product.create({ name: 'jacket', price: '1', image: 'http:image', additionalImage: 'http:additionalImage', categoryId: category.id })
        skuCode = `SKU-${product.id}-black-S`
        const sku = await db.Sku.create({
          productId: product.id,
          skuCode: skuCode,
          price: 1,
          inventoryQuantity: 1,
          color: 'black',
          size: 'S'
        })
        skuId = sku.id
      })

      afterEach(function () {
        if (this.findByPk) {
          this.findByPk.restore()
        }
      })

      it('- response successfully', function (done) {
        request(app)
          .get(`/api/sku/${skuId}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.data).to.have.property('skuCode', skuCode)
            return done()
          })
      })

      it('- database successfully', async () => {
        const sku = await db.Sku.findByPk(skuId)
        sku.id.should.equal(skuId)
        sku.skuCode.should.equal(skuCode)
      })

      it('- should handle database errors', function (done) {
        this.findByPk = sinon.stub(db.Sku, 'findByPk').throws(new Error('database error'))
        request(app)
          .get(`/api/sku/${skuId}`)
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('database error')
            return done()
          })
      })

      it('- should handle sku does not exists error', function (done) {
        request(app)
          .get(`/api/sku/${skuId + 1}`)
          .set('Accept', 'application/json')
          .expect(404)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).to.equal('sku does not exists')
            return done()
          })
      })

      after(async function () {
        this.authenticate.restore()
        this.getUser.restore()
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })

    describe('GET /api/sku', () => {
      before(async function () {
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
        const rootUser = await db.User.create({
          email: 'user@example.com',
          password: 'password',
          phone: '00000000000'
        }); this.authenticate = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          if (typeof callback === 'function') {
            callback(null, { ...rootUser }, undefined)
            return (req: Request, res: Response, next: NextFunction) => { }
          }
        })
        this.getUser = sinon.stub(
          helpers, 'getUser'
        ).returns({ id: 1, isAdmin: true })
        const category = await db.Category.create({ name: 'category' })
        const product = await db.Product.create({ name: 'jacket', price: '1', image: 'http:image', additionalImage: 'http:additionalImage', categoryId: category.id })
        await db.Sku.create({
          productId: product.id, skuCode: 'sku-S', price: 1, inventoryQuantity: 1, color: 'red', size: 'S'
        })
        await db.Sku.create({
          productId: product.id, skuCode: 'sku-M', price: 1, inventoryQuantity: 1, color: 'red', size: 'M'
        })
        await db.Sku.create({
          productId: product.id, skuCode: 'sku-L', price: 1, inventoryQuantity: 1, color: 'red', size: 'L'
        })
      })

      afterEach(function () {
        if (this.findAll) {
          this.findAll.restore()
        }
      })

      it('- response successfully', function (done) {
        request(app)
          .get('/api/sku')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.data.skus).to.be.an('array')
            res.body.data.skus.length.should.equal(3)
            return done()
          })
      })

      it('- should handle database errors', function (done) {
        this.findAll = sinon.stub(db.Sku, 'findAll').throws(new Error('database error'))
        request(app)
          .get('/api/sku')
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('database error')
            return done()
          })
      })

      after(async function () {
        this.authenticate.restore()
        this.getUser.restore()
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })
  })

  context('# PUT', () => {

    describe('PUT /api/sku/:id', () => {
      let skuId: number
      let productId: number
      before(async function () {
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
        const rootUser = await db.User.create({
          email: 'user@example.com',
          password: 'password',
          phone: '00000000000'
        }); this.authenticate = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          if (typeof callback === 'function') {
            callback(null, { ...rootUser }, undefined)
            return (req: Request, res: Response, next: NextFunction) => { }
          }
        })
        this.getUser = sinon.stub(
          helpers, 'getUser'
        ).returns({ id: 1, isAdmin: true })
        const category = await db.Category.create({ name: 'category' })
        const product = await db.Product.create({ name: 'jacket', price: '1', image: 'http:image', additionalImage: 'http:additionalImage', categoryId: category.id })
        productId = product.id
        await db.Sku.create({ productId: productId, skuCode: 'SKU', price: 1, inventoryQuantity: 1, color: 'red', size: 'M' })
        const sku = await db.Sku.create({
          productId: productId,
          skuCode: `SKU-${product.id}-black-S`,
          price: 1,
          inventoryQuantity: 1,
          color: 'black',
          size: 'S'
        })
        skuId = sku.id
      })

      afterEach(function () {
        if (this.findByPk) {
          this.findByPk.restore()
        }
      })

      it('- response successfully', function (done) {
        request(app)
          .put(`/api/sku/${skuId}`)
          .send({
            productId: productId,
            price: 2,
            inventoryQuantity: 1,
            color: 'white',
            size: 'S'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.data.price).to.equal(2)
            expect(res.body.data.skuCode).to.equal(`SKU-${productId}-white-S`)
            return done()
          })
      })

      it('- database successfully', async function () {
        const sku = await db.Sku.findByPk(skuId)
        sku.productId.should.equal(productId)
        sku.price.should.equal(2)
        sku.color.should.equal('white')
      })

      it('- should handle database errors', function (done) {
        this.findByPk = sinon.stub(db.Sku, 'findByPk').throws(new Error('database error'))
        request(app)
          .put(`/api/sku/${skuId}`)
          .send({
            productId: productId,
            price: 2,
            inventoryQuantity: 1,
            color: 'white',
            size: 'S'
          })
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('database error')
            return done()
          })
      })

      it('- should handle product does not exists error', function (done) {
        request(app)
          .put(`/api/sku/${skuId}`)
          .send({
            productId: `${productId + 1}`,
            price: 2,
            inventoryQuantity: 1,
            color: 'white',
            size: 'S'
          })
          .set('Accept', 'application/json')
          .expect(404)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).to.equal('product does not exists')
            return done()
          })
      })

      it('- should handle sku does not exists error', function (done) {
        request(app)
          .put(`/api/sku/${skuId + 1}`)
          .send({
            productId: productId,
            price: 2,
            inventoryQuantity: 1,
            color: 'white',
            size: 'S'
          })
          .set('Accept', 'application/json')
          .expect(404)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).to.equal('sku does not exists')
            return done()
          })
      })

      it('- should handle sku already exists error', function (done) {
        request(app)
          .put(`/api/sku/${skuId}`)
          .send({
            productId: productId,
            price: 2,
            inventoryQuantity: 1,
            color: 'red',
            size: 'M'
          })
          .set('Accept', 'application/json')
          .expect(409)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).to.equal('sku already exists')
            return done()
          })
      })

      after(async function () {
        this.authenticate.restore()
        this.getUser.restore()
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })
  })

  context('# DELETE', () => {

    describe('DELETE /api/sku', () => {
      let skuId: number
      before(async function () {
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
        const rootUser = await db.User.create({
          email: 'user@example.com',
          password: 'password',
          phone: '00000000000'
        }); this.authenticate = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          if (typeof callback === 'function') {
            callback(null, { ...rootUser }, undefined)
            return (req: Request, res: Response, next: NextFunction) => { }
          }
        })
        this.getUser = sinon.stub(
          helpers, 'getUser'
        ).returns({ id: 1, isAdmin: true })
        const category = await db.Category.create({ name: 'category' })
        const product = await db.Product.create({ name: 'jacket', price: '1', image: 'http:image', additionalImage: 'http:additionalImage', categoryId: category.id })
        const sku = await db.Sku.create({
          productId: product.id,
          skuCode: `SKU-${product.id}-black-S`,
          price: 1,
          inventoryQuantity: 1,
          color: 'black',
          size: 'S'
        })
        skuId = sku.id
      })

      afterEach(function () {
        if (this.findByPk) {
          this.findByPk.restore()
        }
      })

      it('- response successfully', function (done) {
        request(app)
          .delete(`/api/sku/${skuId}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.data).to.equal('Sku removed successfully')
            return done()
          })
      })

      it('- database successfully', async function () {
        const sku = await db.Sku.findByPk(skuId)
        should.not.exist(sku)
      })

      it('- should handle database errors', function (done) {
        this.findByPk = sinon.stub(db.Sku, 'findByPk').throws(new Error('database error'))
        request(app)
          .delete(`/api/sku/${skuId}`)
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('database error')
            return done()
          })
      })

      it('- should handle sku does not exists error', function (done) {
        request(app)
          .delete(`/api/sku/${skuId + 1}`)
          .set('Accept', 'application/json')
          .expect(404)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).to.equal('sku does not exists')
            return done()
          })
      })

      after(async function () {
        this.authenticate.restore()
        this.getUser.restore()
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })
  })

})