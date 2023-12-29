const { sequelize, Sequelize } = require('sequelize-test-helpers')
import proxyquire from 'proxyquire'
import db from '../../db/models'
import { expect } from 'chai'
import sinonChai from 'sinon-chai'
import chai from 'chai'
chai.use(sinonChai)

describe('Category Model', () => {
  const { DataTypes } = Sequelize
  const categoryInit = proxyquire('../../db/models/category', {
    sequelize: Sequelize
  })
  let Category: typeof db.Category
  before(() => {
    Category = categoryInit.default(sequelize)
  })
  after(() => {
    Category.init.resetHistory()
  })
  context('properties', () => {
    it('called Category.init with the correct parameters', () => {
      expect(Category.init).to.have.been.calledWithMatch(
        {
          name: { type: DataTypes.STRING }
        }
      )
    })
  })
})