import passport from "../../config/passport"
import sinon from 'sinon'
import db from "../../db/models"
import { Request, Response, NextFunction } from "express"
import helpers from "../../helpers/Helpers"
import request from 'supertest'
import app, { initApp } from "../../app"
import { expect } from "chai"

describe('cart request', () => {
  before(async () => {
    await initApp()
  })
  context('# POST', () => {
    describe('POST /api/cart', () => {
      let userId: number
      before(async function () {
        await db.Cart.destroy({ where: {} })
        await db.User.destroy({ where: {} })
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
        userId = rootUser.id
        this.getUser = sinon.stub(helpers, 'getUser').returns({ id: userId, isAdmin: false })
      })

      afterEach(function () {
        if (this.findByPk) {
          this.findByPk.restore()
        }
      })

      it('- response successfully', function (done) {
        request(app)
          .post('/api/cart')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            expect(res.body.data).to.have.property('userId', userId)
            if (err) return done(err)
            return done()
          })
      })

      it('- should handle database errors', function (done) {
        this.findByPk = sinon.stub(db.User, 'findByPk').throws(new Error('database error'))
        request(app)
          .post('/api/cart')
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('database error')
            return done()
          })
      })

      it('- should handle User already has a cart error', function (done) {
        request(app)
          .post('/api/cart')
          .set('Accept', 'application/json')
          .expect(400)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).to.equal('User already has a cart')
            return done()
          })
      })

      it('- should handle user does not exists error', async function () {
        await db.Cart.destroy({ where: {} })
        await db.User.destroy({ where: {} })
        const res = await request(app)
          .post('/api/cart')
          .set('Accept', 'application/json')
          .expect(404)
        expect(res.body.message).to.equal('user does not exists')

      })

      after(async function () {
        this.authenticate.restore()
        this.getUser.restore()
        await db.Cart.destroy({ where: {} })
        await db.User.destroy({ where: {} })
      })
    })
  })

  context('# GET', () => {
    describe('GET /api/cart', () => {
      before(async function () {
        await db.CartItem.destroy({ where: {} })
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Cart.destroy({ where: {} })
        await db.User.destroy({ where: {} })
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
        this.getUser = sinon.stub(helpers, 'getUser').returns({ id: rootUser.id, isAdmin: false })

        const cart = await db.Cart.create({ userId: rootUser.id })
        const category = await db.Category.create({ name: 'category' })
        const product = await db.Product.create({ name: 'product1', image: 'image', additionalImage: 'additionalImage', price: '1', categoryId: category.id })
        const sku = await db.Sku.create({ productId: product.id, skuCode: 'skuCode', price: '1', inventoryQuantity: '1', color: 'blue', size: 'S' })
        const cartItem = await db.CartItem.create({ cartId: cart.id, skuId: sku.id, quantity: '1' })
      })

      afterEach(function () {
        if (this.findOne) {
          this.findOne.restore()
        }
      })

      it('- response successfully', function (done) {
        request(app)
          .get('/api/cart')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            // console.log(res.body.data)
            expect(res.body.data).to.have.property('userId')
            return done()
          })
      })

      it('- should include CartItems and Sku and Product', function (done) {
        request(app)
          .get('/api/cart')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.data.CartItems[0]).to.have.property('id')
            expect(res.body.data.CartItems[0].Sku).to.have.property('price')
            expect(res.body.data.CartItems[0].Sku).to.have.property('size')
            expect(res.body.data.CartItems[0].Sku).to.have.property('color')
            expect(res.body.data.CartItems[0].Sku).to.have.property('inventoryQuantity')
            expect(res.body.data.CartItems[0].Sku.Product).to.have.property('name')
            expect(res.body.data.CartItems[0].Sku.Product).to.have.property('image')
            return done()
          })
      })

      it('- should handle database errors', function (done) {
        this.findOne = sinon.stub(db.Cart, 'findOne').throws(new Error('database error'))
        request(app)
          .get('/api/cart')
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
        await db.CartItem.destroy({ where: {} })
        await db.Sku.destroy({ where: {} })
        await db.Product.destroy({ where: {} })
        await db.Cart.destroy({ where: {} })
        await db.User.destroy({ where: {} })
        await db.Category.destroy({ where: {} })
      })
    })
  })
})