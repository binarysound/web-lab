import React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { IAppState } from '@/models/appState'
import { NotABeanAction } from '@/not-a-bean/client/actions'
import { Card } from '@/not-a-bean/client/components/Card'
import { CardType, IGame } from '@/not-a-bean/models'

class _NotABean extends React.Component<_NotABean.IProps> {
  public render() {
    const { game } = this.props

    return (
      <div>
        NOT A BEAN
        {game === null ? <div>game is null.</div> : this.renderGame(game)}
      </div>
    )
  }

  private renderGame(game: IGame) {
    const playerIds = Object.keys(game.players).map((key) => parseInt(key, 10))
    console.log(playerIds)

    return (
      <div>
        <div>Phase: {game.phase.type}</div>
        {playerIds.map((playerId) => {
          const player = game.players[playerId]
          return (
            <div key={playerId}>
              <div>PlayerID: {playerId}</div>
              {player.hand.map((card, idx) => {
                if (card.private) {
                  if (card.private.type === CardType.NUMBER) {
                    return (
                      <Card
                        suit={card.private.suit}
                        number={card.private.value + 1}
                        width={100}
                        key={idx}
                      />
                    )
                  }
                }
                return null
              })}
            </div>
          )
        })}
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
