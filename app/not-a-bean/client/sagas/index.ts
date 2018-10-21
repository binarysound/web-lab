import { all, takeEvery } from 'redux-saga/effects'

import { NotABeanAction } from '@/not-a-bean/client/actions'
import { NotABeanServerMsg } from '@/not-a-bean/models/message'

function* handleMessage(action: NotABeanAction.NAB_SAGA_HANDLE_MESSAGE) {
  const serverMsg: NotABeanServerMsg = action.payload
  yield
}

function* watchHandleMessage() {
  yield takeEvery(NotABeanAction.Type.NAB_SAGA_HANDLE_MESSAGE, handleMessage)
}

export default function* rootSaga() {
  yield all([
    watchHandleMessage(),
  ])
}
