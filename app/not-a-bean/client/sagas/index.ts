import { all, put, takeEvery } from 'redux-saga/effects'

import { NotABeanAction } from '@/not-a-bean/client/actions'
import { NotABeanServerMsg, NotABeanServerMsgType } from '@/not-a-bean/models/message'

function* handleMessage(action: NotABeanAction.NAB_SAGA_HANDLE_MESSAGE) {
  const serverMsg: NotABeanServerMsg = action.payload

  if (serverMsg.type === NotABeanServerMsgType.UPDATE_GAME) {
    yield put<NotABeanAction>({
      payload: {
        game: serverMsg.payload.game,
      },
      type: NotABeanAction.Type.NAB_UPDATE_GAME,
    })
  }
}

function* watchHandleMessage() {
  yield takeEvery(NotABeanAction.Type.NAB_SAGA_HANDLE_MESSAGE, handleMessage)
}

export default function* rootSaga() {
  yield all([
    watchHandleMessage(),
  ])
}
