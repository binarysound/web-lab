import { IGame } from '@/not-a-bean/models'

export namespace NotABeanAction {
  export enum Type {
    UPDATE_GAME = 'UPDATE_GAME',
  }

  export interface IBase<A extends Type, P extends object> {
    readonly type: A
    readonly payload: P
  }

  export type UPDATE_GAME = IBase<Type.UPDATE_GAME, {
    game: IGame,
  }>
}

export type NotABeanAction =
  NotABeanAction.UPDATE_GAME
