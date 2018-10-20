import { push } from 'connected-react-router'
import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Route, Switch } from 'react-router'

import { AppAction } from '@/client/actions'
import { NotABean } from '@/client/not-a-bean/components/NotABean'
import { IAppState } from '@/models/appState'
import { IServerMessage } from '@/models/network'

const Page = (props: {
  dispatch: DispatchProp<AppAction>['dispatch'],
  pageName: string,
  toPageName: string,
  toPath: string,
  children?: React.ReactNode,
}) => (
  <div>
    <div>{props.pageName}</div>
    {props.children}
    <div
      style={{
        color: 'blue',
        cursor: 'pointer',
      }}
      onClick={() => props.dispatch(push(props.toPath))}
    >
      to {props.toPageName}
    </div>
  </div>
)

class _TestContainer extends React.Component<_TestContainer.IProps> {
  public componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      payload: {
        message: {
          body: 'This is a message from client.',
        },
      },
      type: AppAction.Type.SAGA_PUSH_CLIENT_MESSAGE,
    })
  }

  public render() {
    const { serverMessage, dispatch } = this.props
    return (
      <div>
        <Switch>
          <Route
            path='/'
            exact={true}
            render={() => (
              <Page
                dispatch={dispatch}
                pageName='Main page'
                toPageName='Another page'
                toPath='/another'
              >
                {serverMessage.body}
              </Page>
            )}
          />
          <Route
            path='/another'
            exact={true}
            render={() => (
              <Page
                dispatch={dispatch}
                pageName='Another page'
                toPageName='Main page'
                toPath='/'
              />
            )}
          />
          <Route
            path='/not-a-bean'
            component={NotABean}
          />
          <Route
            render={() => (
              <Page
                dispatch={dispatch}
                pageName='404'
                toPageName='Main page'
                toPath='/'
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

namespace _TestContainer {
  export interface IPropsFromState {
    currentPath: string  // prop to force rerender when path changes
    serverMessage: IServerMessage
  }
  /* tslint:disable-next-line:no-empty-interface */
  export interface IOwnProps {}

  export type IProps = IPropsFromState & IOwnProps & DispatchProp<AppAction>

  export function mapStateToProps(state: IAppState): IPropsFromState {
    return {
      currentPath: state.router.location.pathname,
      serverMessage: state.env.serverMessage,
    }
  }
}

export const TestContainer = connect<
  _TestContainer.IPropsFromState,
  DispatchProp<AppAction>,
  _TestContainer.IOwnProps,
  IAppState
>(_TestContainer.mapStateToProps)(_TestContainer)
