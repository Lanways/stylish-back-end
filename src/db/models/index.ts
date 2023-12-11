import { Sequelize } from "sequelize";
import { config } from "../../config/database";
import { productInit } from "./product";

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

const Product = productInit(sequelize)
db.Product = Product

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export { Product }
export default db