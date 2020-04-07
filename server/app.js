import express from 'express'
import cors from 'cors'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid';

const app = express()
const port = 3000
const db = lowdb(new FileSync('db/db.json'))

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.defaults({ lists: [] }).write()

app.get('/', (req, res) => {
    res.send('Hello world from server!')
})

app.get('/lists', (req, res) => {
    res.send(db.get('lists'))
})

app.get('/cards/:list_id', (req, res) => {
    const listId = req.params.list_id
    res.send(db.get('lists').find(list => list.id === listId))
})

app.post('/lists', (req, res) => {
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

app.put('/list/:list_id', (req, res) => {
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
