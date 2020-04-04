import express from 'express'
import Database from './db/db'

const app = express()
const port = 3000
const db = new Database()

app.get('/', (req, res) => {
    res.send('Hello world from server!')
})

app.get('/lists', (req, res) => {
    res.send(db.lists())
})

app.get('/cards/:list_id', (req, res) => {
    const listId = parseInt(req.params.list_id, 10)
    res.send(db.cards(listId))
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
