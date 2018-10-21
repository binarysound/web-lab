import { GameAction } from '@/not-a-bean/models'
import { IGame } from '@/not-a-bean/models/game'

export const enum NotABeanClientMsgType {
  SEND_GAME_ACTION,
}

export namespace NotABeanClientMsg {
  interface IBase<T extends NotABeanClientMsgType, P extends {}> {
    type: T
    payload: P
  }

  export type Msg = IBase<NotABeanClientMsgType.SEND_GAME_ACTION, GameAction>
}

export type NotABeanClientMsg = NotABeanClientMsg.Msg

export const enum NotABeanServerMsgType {
  UPDATE_GAME,
}

export namespace NotABeanServerMsg {
  interface IBase<T extends NotABeanServerMsgType, P extends {}> {
    type: T
    payload: P
  }

  export type Msg = IBase<NotABeanServerMsgType.UPDATE_GAME, {
    game: IGame,
  }>
}

export type NotABeanServerMsg = NotABeanServerMsg.Msg
