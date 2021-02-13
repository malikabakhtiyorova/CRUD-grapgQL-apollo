const users = [
	{ user_id: 1, username: 'Maryam', password: '123', is_admin: false },
	{ user_id: 2, username: 'Asiya', password: '123', is_admin: false },
	{ user_id: 3, username: 'Hadija', password: '123', is_admin: false },
	{ user_id: 4, username: 'Aisha', password: '123', is_admin: false },
	{ user_id: 5, username: 'Asmo', password: '123', is_admin: true },
]


const permissions = [
	{ permission_id: 1, user_id: 1, permission_code: 1 },
	{ permission_id: 2, user_id: 1, permission_code: 2 },
	{ permission_id: 3, user_id: 3, permission_code: 4 },
	{ permission_id: 4, user_id: 2, permission_code: 3 },
	{ permission_id: 5, user_id: 5, permission_code: 1 },
	{ permission_id: 6, user_id: 5, permission_code: 2 },
	{ permission_id: 7, user_id: 5, permission_code: 3 },
	{ permission_id: 8, user_id: 5, permission_code: 4},
]

const books = [
	{ book_id: 1, book_name: "Lola" },
	{ book_id: 2, book_name: "Atirgul" },
]


module.exports = { users, permissions, books }


/*
	1 - read
	2 - read and write
	3 - read and change
	4 - read and delete
*/