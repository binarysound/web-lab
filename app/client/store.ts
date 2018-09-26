import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import reducer from '@/client/reducers'
import rootSaga from '@/client/sagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  connectRouter(history)(reducer),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    ),
  ),
)

sagaMiddleware.run(rootSaga)
