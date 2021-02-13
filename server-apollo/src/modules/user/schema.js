const { gql } = require('apollo-server-express')

module.exports = gql` 
	extend type Query {
		users: [User!]!
	}

	extend type Mutation {
		registerUser(username: String! password: String!): Response!
		loginUser(username: String! password: String!): Response!
		addPermission(userId: Int! permissonCode: Int!): Response!
	}

	extend type Subscription {
		newUser: User!
	}

	type User {
		id: Int!
		username: String!
	}

	scalar Response
`