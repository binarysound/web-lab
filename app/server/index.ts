import express from 'express'
import http from 'http'
import SocketIO from 'socket.io'

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.static('build/client'))

const server = http.createServer(app)

const io = SocketIO(server)
io.on('connection', (socket) => {
  socket.emit('server event', { message: 'Hello, world!' })
  socket.on('client event', (data) => {
    /* tslint:disable-next-line:no-console */
    console.log(data)
  })
})

server.listen(PORT, () => {
  /* tslint:disable-next-line:no-console */
  console.log(`App listening on port ${PORT}.`)
})
