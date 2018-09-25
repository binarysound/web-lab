import express from 'express'
import fallback from 'express-history-api-fallback'
import http from 'http'
import SocketIO from 'socket.io'

import { IClientMessage, IServerMessage } from '@/models/network'

const PORT = process.env.PORT || 5000
const root = 'build/client'

const app = express()
app.use(express.static(root))
app.use(fallback('index.html', { root }))

const server = http.createServer(app)

const io = SocketIO(server)
io.on('connection', (socket) => {
  const testServerMsg: IServerMessage = {
    body: 'This is a message from server.',
  }
  socket.emit('serverMessage', testServerMsg)
  socket.on('clientMessage', (data: IClientMessage) => {
    /* tslint:disable-next-line:no-console */
    console.log(data.body)
  })
})

server.listen(PORT, () => {
  /* tslint:disable-next-line:no-console */
  console.log(`App listening on port ${PORT}.`)
})
