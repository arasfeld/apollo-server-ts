import { Db } from 'mongodb';

export interface User {
  username: string
  hashedPassword: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface SignupPayload {
  username: string
  password: string
}

export interface AuthPayload {
  token: string,
  // user: User,
}

export interface Context {
  db: Db
  userId: string
}
