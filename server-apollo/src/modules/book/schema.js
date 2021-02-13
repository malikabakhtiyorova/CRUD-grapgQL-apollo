const { gql } = require('apollo-server-express')

module.exports = gql` 
	extend type Query {
		books: [Book!]!
	}
	
	extend type Mutation {
		addBook(bookName: String!): Response!
		changeBook(bookId: Int! bookName: String!): Response!
		deleteBook(bookId: Int!): Response!
	}
	
	type Book {
		id: Int!
		bookName: String!
	}
`