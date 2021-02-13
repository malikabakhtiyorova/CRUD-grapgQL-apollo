const { books, permissions, users } = require('../../database/database.js') 
const { sign, verify } = require('../../lib/jwt.js')
module.exports = {
	Query: {
		books: (_, args, { token }) => {
			let payload = verify(token)
			let user = users.find(e => e.user_id === payload.id)
			if (user) {
				let perm = permissions.filter(e => {
					return (e.user_id === user.user_id) && (e.permission_code == 1 || e.permission_code == 2 || e.permission_code == 3 || e.permission_code == 4)
				})
				if(perm.length != 0) {
					return books
				} else throw new Error('You are not allowed')
			} else throw new Error("Not found!")
		}
	},

	Mutation: {
		addBook: (_, { bookName }, { token }) => {
			let payload = verify(token)
			let user = users.find(e => e.user_id === payload.id)
			if(user) {
				let perm = permissions.filter(e => {
					return (e.user_id === user.user_id) && ( e.permission_code == 2 )
				})
				console.log(perm)
				if(perm.length != 0) {
					let book = {
						book_id: books[books.length - 1].book_id + 1,
						book_name: bookName
					}
					books.push(book)
					return "A new book has been added!"
				} else throw new Error('You are not allowed')
			} else throw new Error('Not found!')
		},

		changeBook: (_, { bookId, bookName }, { token }) => {
			let payload = verify(token)
			let user = users.find(e => e.user_id === payload.id)
			if(user) {
				let perm = permissions.filter(e => {
					return (e.user_id === user.user_id) && ( e.permission_code == 3 )
				})
				if(perm.length != 0) {
					let book = books.find(e => e.book_id === bookId)
					if (book) {
						book.book_name = bookName
						return "A book has been updated!"
					}
					else "There is no such book!"
				} else throw new Error('You are not allowed')
			} else throw new Error('Not found!')
		},
		
		deleteBook: (_, { bookId }, { token }) => {
			let payload = verify(token)
			let user = users.find(e => e.user_id === payload.id)
			if(user) {
				let perm = permissions.filter(e => {
					return (e.user_id === user.user_id) && ( e.permission_code == 4 )
				})
				if(perm.length != 0) {
					let book = books.find(e => e.book_id === bookId)
				let index = books.indexOf(book)
					if(index != -1) {
						books.splice(index, 1)
						return 'The book has been deleted!'
					} else {
							return 'Not found!'
				}
					
				} else throw new Error('You are not allowed')
			} else throw new Error('Not found!')
		}
	},

	Book: {
		id: (book) => book.book_id,
		bookName: (book) => book.book_name,
	}
}