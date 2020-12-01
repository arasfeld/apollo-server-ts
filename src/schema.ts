import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    signup(username: String!, password: String!): AuthPayload!
  }

  type Query {
    me: User
  }
`
