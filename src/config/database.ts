import { Dialect } from 'sequelize'
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

interface EnvConfig {
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

export const config: EnvConfig =
{
  "development": {
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PASS as string,
    "database": process.env.DB_NAME as string,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PASS as string,
    "database": process.env.DB_NAME_TEST as string,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": 'password',
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}