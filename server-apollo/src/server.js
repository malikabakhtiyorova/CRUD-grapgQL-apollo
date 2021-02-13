const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const http = require('http')
const PORT = process.env.PORT || 5700

const modules = require('./modules/index.js')
const server = new ApolloServer({ modules: modules, context: ({ req }) => {
	return {
		token: req.headers.token
	}

} })

const app = express()
server.applyMiddleware({ app, path: '/graphql' })
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, async () => {
	console.log(`http://localhost:${PORT}/graphql`)
})