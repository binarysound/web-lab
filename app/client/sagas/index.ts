import { eventChannel } from 'redux-saga'
import { all, call, put, take, takeEvery } from 'redux-saga/effects'
import io from 'socket.io-client'

import { AppAction } from '@/client/actions'
import { IServerMessage } from '@/models/network'
import { NotABeanAction } from '@/not-a-bean/client/actions'
import notABeanSaga from '@/not-a-bean/client/sagas'

let webSocket: SocketIOClient.Socket | null = null

function getSocket(): SocketIOClient.Socket {
  if (webSocket === null) {
    webSocket = io.connect('/')
    return webSocket
  }
  return webSocket
}

function createSocketChannel(socket: SocketIOClient.Socket) {
  return eventChannel<IServerMessage>((emit) => {
    socket.on('serverMessage', (data: IServerMessage) => {
      emit(data)
    })

    return () => {
      socket.close()
    }
  })
}

function* handleServerMessage(message: IServerMessage) {
  if ('notABean' in message && message.notABean) {
    yield put<AppAction>({
      payload: message.notABean,
      type: NotABeanAction.Type.NAB_SAGA_HANDLE_MESSAGE,
    })
  }
}

function* watchSocketConnection() {
  const socket = yield call(getSocket)
  const socketChannel = yield call(createSocketChannel, socket)

  while (true) {
    const message: IServerMessage = yield take(socketChannel)
    yield call(handleServerMessage, message)
  }
}

function* pushClientMessage(action: AppAction.SAGA_PUSH_CLIENT_MESSAGE) {
  const socket = yield call(getSocket)
  socket.emit('clientMessage', action.payload.message)
}

function* watchPushClientMessage() {
  yield takeEvery(AppAction.Type.SAGA_PUSH_CLIENT_MESSAGE, pushClientMessage)
}

export default function* rootSaga() {
  yield all([
    watchSocketConnection(),
    watchPushClientMessage(),
    notABeanSaga(),
  ])
}
