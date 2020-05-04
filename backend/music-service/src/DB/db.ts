import mongoose from 'mongoose'
import { config } from 'dotenv'
import { MONGO_URL } from '../constants/db'

config()
const mongo_port = process.env.DB_URI || MONGO_URL

export class Mongoose {
  constructor() {
    this.connect()
  }

  private connect() {
    mongoose.Promise = global.Promise
    mongoose.connect(mongo_port, {
      user: process.env.MONGODB_APPLICATION_USER,
      pass: process.env.MONGODB_APPLICATION_PASS,
      useNewUrlParser: true,
    })
  }
}
