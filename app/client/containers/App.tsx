import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Provider } from 'react-redux'

import { TestContainer } from '@/client/containers/TestContainer'
import { history, store } from '@/client/store'

namespace App {
  /* tslint:disable-next-line:no-empty-interface */
  export interface IProps {}

  export interface IState {
    message: string
  }
}

export class App extends React.Component<App.IProps, App.IState> {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <TestContainer />
        </ConnectedRouter>
      </Provider>
    )
  }
}
