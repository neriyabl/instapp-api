import express from 'express'
import cors from 'cors'
import { users } from './data/users.js'
import { chats } from './data/chats.js'
import { messages } from './data/messages.js' 
const app = express()
const port = process.env.PORT || 5000

app.use(cors())

app.get('/', (req, res) => {
		res.send('Hello World!')
})

app.get('/users', (req, res) => {
		res.send(users)
})

const getUserDTO = (id) => ({id: users[id].id, name: users[id].name})

const getChatDTO = (id) => {
		const { messages: cMessages, ...chat } = { ...chats[id] }
		chat.members = chat.members.map(getUserDTO)
		chat.lastMessage = messages[cMessages[cMessages.length -1]]
		return chat
}

app.get('/users/:id', (req, res) => {
		const { id } = req.params
		if(!Object.keys(users).includes(id)){
				res.sendStatus(400)
				return
		}
		const user = {...users[id]}
		user.chats = user.chats.map(getChatDTO)
		res.send(user)
})

app.get('/chats', (req, res) => {
		res.send(chats)
})

app.get('/chats/:id', (req, res) => {
		const { id } = req.params
		if(!Object.keys(chats).includes(id)){
				res.sendStatus(400)
				return
		}
		const chat = { ...chats[id] }
		chat.members = chat.members.map(getUserDTO)
		chat.messages = chat.messages.map(id => {
				const message = {...messages[id]}
				message.author = getUserDTO(message.author)
				return message
		})
		res.send(chat)
})


app.get('/messages', (req, res) => {
		res.send(messages)
})


app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
})
