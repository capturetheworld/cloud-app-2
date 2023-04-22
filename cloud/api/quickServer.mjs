import { Server } from 'socket.io'
import express from 'express'

const app = express()
const port = 3000
app.use(express.json())

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)

const socketIo = new Server(server, {
  cors: {
    origin: '*', // Allow any origin for testing purposes. This should be changed on production.
  },
})

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log('Hello World!')
})

app.get('/info/timestamp', (req, res) => {
  res.json(Date.now());
})

app.put('/circuit/level', (req, res) => {
  console.log('PUT', req.body)
  res.send(200)

  //  Circuit socket delay emulation ///////////
  const msg = {
    key: 'Circuit',
    value: {
      name: req.body.name,
      state: {
        value: req.body.level,
        level: req.body.level,
        levelTs: Date.now()
      },
    },
  }
  setTimeout(() => socketIo.emit('update', msg), 1000)
})

app.put('/circuit/scene/:id', (req, res) => {
  console.log('PUT', req.params.id);
  res.sendStatus(200);
})

socketIo.on('connection', (socket) => {
  console.log('New connection created')
})
