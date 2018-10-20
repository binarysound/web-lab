import React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { IAppState } from '@/models/appState'
import { NotABeanAction } from '@/not-a-bean/client/actions'
import { IGame } from '@/not-a-bean/models'
// import { Card } from '@/not-a-bean/client/components/Card'

class _NotABean extends React.Component<_NotABean.IProps> {
  public render() {
    return (
      <div>
        NOT A BEAN
        {/*
        {Array(4).fill(null).map((_, suit) => {
          return (
            <div key={suit}>
              {Array(10).fill(null).map((__, idx) => (
                <Card
                  width={100}
                  key={idx}
                  suit={suit}
                  number={idx + 1}
                />
              ))}
            </div>
          )
        })}*/}
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
