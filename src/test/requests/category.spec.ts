import app from "../../app"
import db from "../../db/models"
import request from "supertest"
import { expect } from 'chai'

describe('# category requests', () => {

  context('# POST', () => {

    describe('POST /api/category', () => {
      before(async () => {
        await db.Category.destroy({ where: {} })
      })
      it(' successfully', async () => {
        const res = await request(app)
          .post('/api/category')
          .send({
            name: 'name'
          })
          .set('Accept', 'application/json')
          .expect(200)
        const caterogyRes = res.body.data
        expect(caterogyRes).to.be.an('object')
        expect(caterogyRes.name).to.be.equal('name')
        const categoryId = res.body.data.id
        const category = await db.Category.findByPk(categoryId)
        expect(category).to.exist
      })
      after(async () => {
        await db.Category.destroy({ where: {} })
      })
    })

  })

  context('# GET', () => {

    describe('GET /api/category', () => {
      let categoryId: string
      before(async () => {
        await db.Category.destroy({ where: {} })
        const category = await db.Category.create({ name: 'category' })
        categoryId = category.id
      })
      it(' - successfully', async () => {
        const res = await request(app)
          .get('/api/category')
          .set('Accept', 'application/json')
          .expect(200)
        const categoryRes = res.body.data
        expect(categoryRes).to.be.an('array')
      })
      it(' - successfully', async () => {
        const res = await request(app)
          .get(`/api/category/${categoryId}`)
          .set('Accept', 'application/json')
          .expect(200)
        const categoryRes = res.body.data
        expect(categoryRes).to.be.an('object')
      })
      after(async () => {
        await db.Category.destroy({ where: {} })
      })
    })
  })

  context('# PUT', () => {
    describe('PUT /api/category', () => {
      let categoryId: string
      before(async () => {
        await db.Category.destroy({ where: {} })
        const category = await db.Category.create({ name: 'category' })
        categoryId = category.id
      })
      it(' - successfully', async () => {
        const res = await request(app)
          .put(`/api/category/${categoryId}`)
          .send({
            name: 'category1'
          })
          .set('Accept', 'application/json')
          .expect(200)
        const categoryRes = res.body.data
        expect(categoryRes.name).to.be.equal('category1')
        const category = await db.Category.findByPk(categoryId)
        expect(category.name).to.be.equal('category1')
      })
      after(async () => {
        await db.Category.destroy({ where: {} })
      })
    })
  })

  context('# DELETE', () => {
    describe('DELETE /api/category', () => {
      let categoryId: string
      before(async () => {
        await db.Category.destroy({ where: {} })
        const category = await db.Category.create({ name: 'category' })
        await db.Category.create({ name: '未分類' })
        categoryId = category.id
      })
      it(' - successfully', async () => {
        const res = await request(app)
          .delete(`/api/category/${categoryId}`)
          .set('Accept', 'application/json')
          .expect(200)
        const categoryRes = res.body.data
        expect(categoryRes.name).to.be.equal('category')
        const category = await db.Category.findByPk(categoryId)
        expect(category).to.be.null
      })
      after(async () => {
        await db.Category.destroy({ where: {} })
      })
    })
  })

})