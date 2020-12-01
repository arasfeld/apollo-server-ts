import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { getContext } from './context'
import resolvers from './resolvers'
import schema from './schema'

const app = express()
const port = process.env.PORT || 4000

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: getContext,
})

server.applyMiddleware({ app })

app.listen({ port }, () => {
  console.log(`🚀  Server ready at http://localhost:${port}`)
})
