import express from 'express'
import fallback from 'express-history-api-fallback'
import http from 'http'
import SocketIO from 'socket.io'

import { IClientMessage, IServerMessage } from '@/models/network'
import { generateInitialGame } from '@/not-a-bean/core'
import { NotABeanServerMsgType } from '@/not-a-bean/models/message'

const PORT = process.env.PORT || 5000
const root = 'build/client'

const app = express()
app.use(express.static(root))
app.use(fallback('index.html', { root }))

const server = http.createServer(app)

const io = SocketIO(server)
io.on('connection', (socket) => {
  const initialMessage: IServerMessage = {
    notABean: {
      payload: {
        game: generateInitialGame(4),
      },
      type: NotABeanServerMsgType.UPDATE_GAME,
    },
  }
  socket.emit('serverMessage', initialMessage)

  socket.on('clientMessage', (data: IClientMessage) => {
    /* tslint:disable-next-line:no-console */
    console.log(data)

    if ('notABean' in data && data.notABean) {
      /* tslint:disable-next-line:no-console */
      console.log('notABean message')
    }
  })
})

server.listen(PORT, () => {
  /* tslint:disable-next-line:no-console */
  console.log(`App listening on port ${PORT}.`)
})
