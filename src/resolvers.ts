import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AuthPayload, Context, LoginPayload, SignupPayload, User } from './types'

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret' // TODO: store this secret somewhere

export default {
  Query: {
    me: (parent: any, args: any, ctx: Context): Promise<User | null> =>
      ctx.db.collection('users').findOne({ _id: ctx.userId }),
  },
  Mutation: {
    login: async (parent: any, { username, password }: LoginPayload, ctx: Context): Promise<AuthPayload> => {
      const user = await ctx.db.collection('users').findOne({ username })
      if (!user) throw new Error('User does not exist')
    
      const passwordIsValid = await bcrypt.compare(password, user.hashedPassword)
      if (!passwordIsValid) throw new Error('Password incorrect')
    
      const token = jwt.sign({ id: user._id }, JWT_SECRET)
    
      return { token }
    },
    signup: async (parent: any, { username, password }: SignupPayload, ctx: Context): Promise<AuthPayload> => {
      const existingUser = await ctx.db.collection('users').findOne({ username })
      if (existingUser) {
        throw new Error('User already exists!')
      }
    
      const hashedPassword = await bcrypt.hash(password, 10)
      const result = await ctx.db.collection<User>('users').insertOne({
        username,
        hashedPassword
      })
    
      const token = jwt.sign({ id: result.insertedId }, JWT_SECRET)
    
      return { token }
    }
  }
}
