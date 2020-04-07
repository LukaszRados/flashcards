import express from 'express'
import cors from 'cors'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const app = express()
const port = 3000
const db = lowdb(new FileSync('db/db.json'))

app.use(cors())
db.defaults({ lists: [] }).write()

app.get('/', (req, res) => {
    res.send('Hello world from server!')
})

app.get('/lists', (req, res) => {
    res.send(db.get('lists'))
})

app.get('/cards/:list_id', (req, res) => {
    const listId = parseInt(req.params.list_id, 10)
    res.send(db.get('lists').find(list => list.id === listId))
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
