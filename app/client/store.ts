import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import { AppAction } from '@/client/actions'
import reducer from '@/client/reducers'
import rootSaga from '@/client/sagas'
import { IAppState } from '@/models/appState'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore<IAppState, AppAction, {}, {}>(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
    ),
  ),
)

sagaMiddleware.run(rootSaga)
