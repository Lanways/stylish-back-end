import db from "../../db/models"
import app from "../../app"
import request from 'supertest'
import chai, { expect } from "chai"
import sinonChai = require("sinon-chai")
chai.use(sinonChai)
const should = chai.should()
import bcrypt from 'bcryptjs'
import passport from '../../config/passport'
import sinon from 'sinon'
import { Request, Response, NextFunction } from "express"
import helpers from "../../helpers/Helpers"

describe('# user requests', () => {
  context('# POST', () => {

    describe('POST /api/user/signup', () => {
      let userId: number
      before(async () => {
        await db.User.destroy({ where: {} })
      })
      it('- response successfully', async () => {
        const res = await request(app)
          .post('/api/user/signup')
          .send({
            email: 'user@email.com',
            password: 'password',
            phone: '0000000000'
          })
          .set('Accept', 'application/json')
          .expect(200)
        userId = res.body.data.id
        expect(res.status).to.equal(200)
        expect(res.body.data).to.have.not.property('password')
        expect(res.body.data).to.have.property('email', 'user@email.com')
      })
      it('- database successfully', async () => {
        const user = await db.User.findByPk(userId)
        user.email.should.equal('user@email.com')
      })
      after(async () => {
        await db.User.destroy({ where: {} })
      })
    })

    describe('POST /api/user/signin', () => {
      before(async () => {
        await db.User.destroy({ where: {} })
        await db.User.create({
          email: 'user@example.com',
          password: await bcrypt.hash('password', 10),
          phone: '00000000000'
        })
      })
      it('- reponse successfully', async () => {
        const res = await request(app)
          .post('/api/user/signin')
          .send({
            email: 'user@example.com',
            password: 'password'
          })
          .set('Accept', 'application/json')
          .expect(200)
        expect(res.status).to.equal(200)
        expect(res.body.data).to.have.property('token')
        expect(res.body.data).to.have.property('userObject')
      })
      after(async () => {
        await db.User.destroy({ where: {} })
      })
    })
  })

  context('# GET', () => {
    describe('GET /api/user', () => {
      before(async function () {
        await db.User.destroy({ where: {} })
        const rootUser = await db.User.create({
          email: 'user@example.com',
          password: 'password',
          phone: '00000000000'
        }); this.authenticateStub = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          if (typeof callback === 'function') {
            callback(null, { ...rootUser }, undefined)
            return (req: Request, res: Response, next: NextFunction) => { }
          }
        })
        this.getUserStub = sinon.stub(
          helpers, 'getUser'
        ).returns({ id: 1, isAdmin: true })
        await db.User.create({ email: 'user1@example.com', password: 'password', phone: '00000000001' })
        await db.User.create({ email: 'user2@example.com', password: 'password', phone: '00000000002' })
      })

      it('- response successfully', (done) => {
        request(app)
          .get('/api/user')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.status).to.equal(200)
            expect(res.body.data.users).to.be.an('array')
            expect(res.body.data).to.have.property('pagination')
            res.body.data.users.length.should.equal(3)
            return done()
          })
      })
      after(async function () {
        this.authenticateStub.restore()
        this.getUserStub.restore()
        await db.User.destroy({ where: {} })
      })
    })
    describe('GET /api/user/:id', () => {
      let userId: number
      before(async function () {
        await db.User.destroy({ where: {} })
        const rootUser = await db.User.create({
          email: 'user@example.com',
          password: 'password',
          phone: '00000000000'
        }); this.authenticateStub = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          if (typeof callback === 'function') {
            callback(null, { ...rootUser }, undefined)
            return (req: Request, res: Response, next: NextFunction) => { }
          }
        })
        this.getUserStub = sinon.stub(
          helpers, 'getUser'
        ).returns({ id: 1, isAdmin: false })
        userId = rootUser.id
      })
      it('- response successfully', (done) => {
        request(app)
          .get(`/api/user/${userId}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.status).to.equal(200)
            expect(res.body.data).to.have.property('isAdmin', false)
            expect(res.body.data).to.have.not.property('password')
            return done()
          })
      })
      after(async function () {
        this.authenticateStub.restore()
        this.getUserStub.restore()
        await db.User.destroy({ where: {} })
      })
    })
  })

  context('# PUT', () => {
    describe('PUT /api/user', () => {
      let userId: number
      before(async function () {
        await db.User.destroy({ where: {} })
        const rootUser = await db.User.create({
          email: 'user@example.com',
          password: await bcrypt.hash('password', 10),
          phone: '00000000000'
        }); this.authenticateStub = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          if (typeof callback === 'function') {
            callback(null, { ...rootUser }, undefined)
            return (req: Request, res: Response, next: NextFunction) => { }
          }
        })
        userId = rootUser.id
        this.getUserStub = sinon.stub(
          helpers, 'getUser'
        ).returns({ id: userId, isAdmin: true })
      })
      it('- response successfully', (done) => {
        request(app)
          .put(`/api/user/${userId}`)
          .send({
            name: 'name',
            password: 'password'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.status).to.equal(200)
            expect(res.body.data).to.have.property('name', 'name')
            expect(res.body.data).to.have.not.property('password')
            return done()
          })
      })

      it('- database successfully', async () => {
        const putUser = await db.User.findByPk(userId)
        putUser.name.should.equal('name')
      })

      after(async function () {
        this.authenticateStub.restore()
        this.getUserStub.restore()
        await db.User.destroy({ where: {} })
      })
    })
  })

  context('# DELETE', () => {

    describe('DELETE /api/user', () => {
      let userId: number
      before(async function () {
        await db.User.destroy({ where: {} })
        const rootUser = await db.User.create({
          email: 'user@example.com',
          password: await bcrypt.hash('password', 10),
          phone: '00000000000'
        }); this.authenticateStub = sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
          if (typeof callback === 'function') {
            callback(null, { ...rootUser }, undefined)
            return (req: Request, res: Response, next: NextFunction) => { }
          }
        })
        this.getUserStub = sinon.stub(
          helpers, 'getUser'
        ).returns({ id: rootUser.id, isAdmin: true })
        const user = await db.User.create({ email: 'user1@example', password: 'password', phone: '00000000001' })
        userId = user.id
      })

      it('- response successfully', (done) => {
        request(app)
          .delete(`/api/user/${userId}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.status).to.equal(200)
            expect(res.body.data).to.have.not.property('password')
            return done()
          })
      })

      it('- database successfully', async () => {
        const removedUser = await db.User.findByPk(userId)
        expect(removedUser).to.be.null
      })

      after(async function () {
        this.authenticateStub.restore()
        this.getUserStub.restore()
        await db.User.destroy({ where: {} })
      })
    })
  })

})