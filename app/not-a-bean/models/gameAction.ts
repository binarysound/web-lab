import { PlayerID } from '@/not-a-bean/models/game'

export const enum GameActionType {
  StartGame,
  PlayCard,
  SelectCard,
}

interface IGameActionBase<T extends GameActionType, P> {
  type: T
  payload: P
}

export type GameAction =
  IGameActionBase<GameActionType.StartGame, {
    firstPlayer: PlayerID,
  }> |
  IGameActionBase<GameActionType.PlayCard, {
    playerID: PlayerID,
    cardIdx: number,
  }> |
  IGameActionBase<GameActionType.SelectCard, {
    playerID: PlayerID,
    selectedIdx: number,
  }>
