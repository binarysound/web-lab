import React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { IAppState } from '@/models/appState'
import { NotABeanAction } from '@/not-a-bean/client/actions'
import { IGame } from '@/not-a-bean/models'
// import { Card } from '@/not-a-bean/client/components/Card'

class _NotABean extends React.Component<_NotABean.IProps> {
  public render() {
    const { game } = this.props

    return (
      <div>
        NOT A BEAN
        {game === null ? <div>game is null.</div> : <div>game is not null.</div>}
      </div>
    )
  }
}

namespace _NotABean {
  export interface IPropsFromState {
    game: IGame | null
  }
  /* tslint:disable-next-line:no-empty-interface */
  export interface IOwnProps {}
  export type IProps = IPropsFromState & IOwnProps & DispatchProp<NotABeanAction>
  export function mapStateToProps(state: IAppState): IPropsFromState {
    return {
      game: state.notABean.game,
    }
  }
}

export const NotABean = connect(_NotABean.mapStateToProps)(_NotABean)
