const pubsub = require('../../lib/pubsub.js')
const { sign, verify } = require('../../lib/jwt.js')
const { users, permissions } = require('../../database/database.js')

module.exports = {
	Query: {
		users: async (_, args, { token }) => {
			let payload = verify(token)
			let user = users.find(e => e.user_id === payload.id)
			if (user) {
				let perm = permissions.filter(e => {
					return (e.user_id === user.user_id) && (e.permission_code == 1 || e.permission_code == 2 || e.permission_code == 3 || e.permission_code == 4)
				})
				if(perm.length != 0) {
					return users
				} else throw new Error('You are not allowed')
			} else throw new Error("Not found!")
		}
	},

	Mutation: {
		registerUser: (_, { username, password }) => {
			let user = {
				user_id:  users[users.length - 1 ].user_id + 1,
				username,
				password
			}
			console.log(user)
			pubsub.publish('NEW_USER', user)
			users.push(user)
			return {
				message: 'You are registered!',
				token: sign({ id: user.user_id })
			}
		},
		loginUser: (_, { username, password }) => {
			let user = users.find(e => e.username === username && e.password === password)
			if(user) {
				return {
					message: 'You are logged in!',
					token: sign({ id: user.user_id })
				}	
			} else {
				return {
					message: 'Not found!',
					token: null
				}
			}
		},
		addPermission: (_, { userId, permissonCode }, { token }) => {
			let payload = verify(token)
			let user = users.find(e => e.user_id === payload.id)

			if (user.username === 'root') {
			let perm = {
				permission_id: permissions[permissions.length - 1 ].permission_id + 1,
				user_id: userId,
				permission_code: permissonCode
			}
			permissions.push(perm)
			return 'permission added!'
		}	else throw new Error("Not found!")
		}	
	},

	Subscription: {
		newUser: {
			subscribe: () => pubsub.asyncIterator(['NEW_USER']),
			resolve: (payload) => {
				return payload
			},
		}
	},

	User: {
		id: (user) => user.user_id,
	}
}