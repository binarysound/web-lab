import { IGame } from '@/not-a-bean/models'
import { NotABeanServerMsg } from '@/not-a-bean/models/message'

export namespace NotABeanAction {
  export enum Type {
    NAB_UPDATE_GAME = 'NAB_UPDATE_GAME',
    NAB_SAGA_HANDLE_MESSAGE = 'NAB_SAGA_HANDLE_MESSAGE',
  }

  export interface IBase<A extends Type, P extends object> {
    readonly type: A
    readonly payload: P
  }

  export type NAB_UPDATE_GAME = IBase<Type.NAB_UPDATE_GAME, {
    game: IGame,
  }>

  export type NAB_SAGA_HANDLE_MESSAGE = IBase<
    Type.NAB_SAGA_HANDLE_MESSAGE,
    NotABeanServerMsg
  >
}

export type NotABeanAction =
  NotABeanAction.NAB_UPDATE_GAME |
  NotABeanAction.NAB_SAGA_HANDLE_MESSAGE
