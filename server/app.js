import express from 'express'
import cors from 'cors'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authMiddleware from './middleware/auth'

const users = [{
    username: 'admin',
    password: bcrypt.hashSync('admin', 8),
}]

const app = express()
const port = 3000
const db = lowdb(new FileSync('db/db.json'))

dotenv.config()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.defaults({ lists: [] }).write()

app.post('/user/login', (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
    }
    const user = users.find(user => user.username === data.username)
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
        res.send({
            auth: false,
            error: 'No user found'
        })
        return
    }
    const token = jwt.sign(user, process.env.TOKEN, {
        expiresIn: 86400
    })
    if (token) {
        res.send({
            auth: true,
            token,
            username: user.username,
        })
    } else {
        res.send({
            auth: false,
            error: 'Unable to generate a token'
        })
    }
})

app.get('/lists', authMiddleware, (req, res) => {
    res.send(db.get('lists'))
})

app.get('/cards/:list_id', authMiddleware, (req, res) => {
    const listId = req.params.list_id
    res.send(db.get('lists').find(list => list.id === listId))
})

app.post('/lists', authMiddleware, (req, res) => {
    db.get('lists').push({
        id: uuidv4(),
        title: req.body.title,
        emoji: req.body.emoji,
        cards: req.body.cards.map(card => {
            return {
                ...card,
                id: uuidv4()
            }
        })
    }).write()

    res.send({
        status: 'Success'
    })
})

app.put('/list/:list_id', authMiddleware, (req, res) => {
    const listId = req.params.list_id
    db
        .get('lists')
        .find({ id: listId })
        .assign(req.body)
        .write()
    res.send({
        status: 'Success'
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
