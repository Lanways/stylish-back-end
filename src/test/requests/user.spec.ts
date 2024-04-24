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
import jwt from 'jsonwebtoken'

describe('# user requests', () => {
  context('# POST', () => {

    describe('POST /api/user/signup', () => {
      let userId: number
      before(async () => {
        await db.User.destroy({ where: {} })
      })

      afterEach(function () {
        if (this.userCreate) {
          this.userCreate.restore()
        }
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
        expect(res.body.data).to.have.not.property('password')
        expect(res.body.data).to.have.property('email', 'user@email.com')
      })
      it('- database successfully', async () => {
        const user = await db.User.findByPk(userId)
        user.email.should.equal('user@email.com')
      })

      it('- should handle database errors', function (done) {
        this.userCreate = sinon.stub(db.User, 'create').throws(new Error('Database error'))
        request(app)
          .post('/api/user/signup')
          .send({
            email: 'user1@example.com',
            password: 'password',
            phone: '0000000001'
          })
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('Database error')
            return done()
          })
      })

      it('- should handle email already exists error', (done) => {
        request(app)
          .post('/api/user/signup')
          .send({ email: 'user@email.com', password: 'password', phone: '0000000000' })
          .set('Accept', 'application/json')
          .expect(409)
          .end(function (err, res) {
            expect(res.status).to.equal(409);
            expect(res.body.message).to.equal('email already exists');
            return done()
          })
      })

      it('- should handle phone already exists error', (done) => {
        request(app)
          .post('/api/user/signup')
          .send({ email: 'user1@example.com', password: 'password', phone: '0000000000' })
          .set('Accept', 'application/json')
          .expect(409)
          .end(function (err, res) {
            expect(res.status).to.equal(409);
            expect(res.body.message).to.equal('phone already exists')
            return done()
          })
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

      afterEach(function () {
        if (this.jwtSign) {
          this.jwtSign.restore()
        }
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
        expect(res.body.data).to.have.property('token')
        expect(res.body.data).to.have.property('userObject')
      })

      it('- should handle database errors', function (done) {
        this.jwtSign = sinon.stub(jwt, 'sign').throws(new Error('JWT Error'))
        request(app)
          .post('/api/user/signin')
          .send({
            email: 'user@example.com',
            password: 'password'
          })
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.be.equal('JWT Error')
            return done()
          })
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

      afterEach(function () {
        if (this.findAll) {
          this.findAll.restore()
        }
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

      it('- should handle database errors', function (done) {
        this.findAll = sinon.stub(db.User, 'findAll').throws(new Error('Database error'))
        request(app)
          .get('/api/user')
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('Database error')
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

      afterEach(function () {
        if (this.findByPk) {
          this.findByPk.restore()
        }
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

      it('- should handle database errors', (done) => {
        request(app)
          .get(`/api/user/${userId - 1}`)
          .set('Accept', 'application/json')
          .expect(404)
          .end(function (err, res) {
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('user does not exist')
            return done()
          })
      })

      it('- should handle user does not exist', function (done) {
        this.findByPk = sinon.stub(db.User, 'findByPk').throws(new Error('Database error'))
        request(app)
          .get(`/api/user/${userId}`)
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            expect(res.body.message).to.equal('Database error')
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

      afterEach(function () {
        if (this.findByPk) {
          this.findByPk.restore()
        }
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

      it('- should handle database error', function (done) {
        this.findByPk = sinon.stub(db.User, 'findByPk').throws(new Error('Database error'))
        request(app)
          .put(`/api/user/${userId}`)
          .send({
            name: 'name',
            password: 'password'
          })
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('Database error')
            return done()
          })
      })

      it('- should handle user does not exist', async function () {
        await db.User.destroy({ where: { id: userId } })
        const res = await request(app)
          .put(`/api/user/${userId}`)
          .send({
            name: 'name',
            password: 'password'
          })
          .set('Accept', 'application/json')
          .expect(404)
        expect(res.body.message).to.equal('user does not exist')
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

      afterEach(function () {
        if (this.findByPk) {
          this.findByPk.restore()
        }
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

      it('- should handle database error', function (done) {
        this.findByPk = sinon.stub(db.User, 'findByPk').throws(new Error('Database error'))
        request(app)
          .delete(`/api/user/${userId}`)
          .set('Accept', 'application/json')
          .expect(500)
          .end(function (err, res) {
            expect(res.error).to.be.an.instanceOf(Error)
            expect(res.body.message).to.equal('Database error')
            return done()
          })
      })

      it('- should handle user does not exist', async function () {
        await db.User.destroy({ where: { id: userId } })
        const res = await request(app)
          .delete(`/api/user/${userId}`)
          .set('Accept', 'application/json')
          .expect(404)
        expect(res.error).to.be.an.instanceOf(Error)
        expect(res.body.message).to.equal('user does not exist')
      })

      after(async function () {
        this.authenticateStub.restore()
        this.getUserStub.restore()
        await db.User.destroy({ where: {} })
      })
    })
  })

})