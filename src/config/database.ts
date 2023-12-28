import { Dialect } from 'sequelize'
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

export interface EnvConfig {
  development: DBConfig
  test: DBConfig
  production: DBConfig
}

interface DBConfig {
  username: string
  password: string
  database: string
  host: string
  dialect: Dialect
}

const config: EnvConfig =
{
  "development": {
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PASS as string,
    "database": process.env.DB_NAME as string,
    "host": process.env.DB_HOST as string,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PASS as string,
    "database": process.env.DB_NAME_TEST as string,
    "host": process.env.DB_HOST as string,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PASS as string,
    "database": process.env.DB_NAME as string,
    "host": process.env.DB_HOST as string,
    "dialect": "postgres"
  }
}

module.exports = config
