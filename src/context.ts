import { ContextFunction } from 'apollo-server-core'
import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { MongoClient } from 'mongodb'
import { Context } from './types'

const MONGO_URI: string = process.env.MONGO_HOST || 'mongodb://localhost:27017/apollo-server'
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret'

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

export const getContext: ContextFunction = async ({ req }: { req: Request }): Promise<Context> => {
  const token = req.headers.authorization || ''
  const userId = token && jwt.verify(token, JWT_SECRET).toString()
  return {
    db: (await client.connect()).db(),
    userId,
  }
}
