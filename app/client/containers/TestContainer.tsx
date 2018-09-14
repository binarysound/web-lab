import React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { AppAction } from '@/client/actions'
import { IAppState } from '@/models/appState'
import { IServerMessage } from '@/models/network'

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
    const { serverMessage } = this.props
    return <div>{serverMessage.body}</div>
  }
}

namespace _TestContainer {
  export interface IPropsFromState {
    serverMessage: IServerMessage
  }
  /* tslint:disable-next-line:no-empty-interface */
  export interface IOwnProps {}

  export type IProps = IPropsFromState & IOwnProps & DispatchProp<AppAction>

  export function mapStateToProps(state: IAppState): IPropsFromState {
    return {
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
