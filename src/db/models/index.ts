import { Sequelize } from "sequelize";
import { config } from "../../config/database";
import fs from 'fs'
import path from 'path'

const env = process.env.NODE_ENV as 'development' | 'test' | 'production' || 'development'
const dbConfig = config[env]
const dbUsername = dbConfig.username
const dbPassword = dbConfig.password
const dbName = dbConfig.database
const dbHost = dbConfig.host
const dbDialect = dbConfig.dialect

let sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect
})

const db: { [key: string]: any } = {}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.ts');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default(sequelize)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db