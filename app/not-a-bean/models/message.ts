import { GameAction } from '@/not-a-bean/models'
import { IGame } from '@/not-a-bean/models/game'

export namespace NotABeanClientMsg {
  const enum Type {
    SEND_GAME_ACTION,
  }
  interface IBase<T extends Type, P extends {}> {
    type: T
    payload: P
  }

  export type Msg = IBase<Type.SEND_GAME_ACTION, GameAction>
}

export type NotABeanClientMsg = NotABeanClientMsg.Msg

export namespace NotABeanServerMsg {
  const enum Type {
    UPDATE_GAME,
  }
  interface IBase<T extends Type, P extends {}> {
    type: T
    payload: P
  }

  export type Msg = IBase<Type.UPDATE_GAME, {
    game: IGame,
  }>
}

export type NotABeanServerMsg = NotABeanServerMsg.Msg
