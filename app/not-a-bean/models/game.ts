export type PlayerID = number

interface IPrivateInfo<PrivateType, PublicType> {
  __meta: {
    knownTo: PlayerID[],
  } | null
  private?: PrivateType
  public: PublicType
}

export const enum CardType {
  NUMBER = 'NUMBER',
  SPECIAL = 'SPECIAL',
}

export const enum SpecialCardValue {
  NEGATION = 'NEGATION',
  DOUBLE = 'DOUBLE',
  ZEROING = 'ZEROING',
}

interface ICardBase<C extends CardType, V> {
  suit: number
  type: C
  value: V
}

export type Card =
  ICardBase<CardType.NUMBER, number> |
  ICardBase<CardType.SPECIAL, SpecialCardValue>

type CardInHand = IPrivateInfo<Card, {
  isMouseOn: boolean,
}>

interface IBoard {
  cardsPlayed: Array<{
    playerID: PlayerID,
    card: Card,
  }>
}

interface IPlayerData {
  hand: CardInHand[]
  cardsAcquired: Card[]
}

export const enum PhaseType {
  BeforeStart = 'BeforeStart',
  WaitForFirstCard = 'WaitForFirstCard',
  WaitForOtherCards = 'WaitForOtherCards',
  WaitForSelection = 'WaitForSelection',
  End = 'End',
}

interface IGamePhaseBase<T extends PhaseType, P> {
  type: T
  payload: P
}

type GamePhase =
  IGamePhaseBase<PhaseType.BeforeStart, null> |
  IGamePhaseBase<PhaseType.WaitForFirstCard, null> |
  IGamePhaseBase<PhaseType.WaitForOtherCards, {
    notYetPlayedIDs: PlayerID[],
  }> |
  IGamePhaseBase<PhaseType.WaitForSelection, {
    selectingPlayerID: PlayerID,
  }> |
  IGamePhaseBase<PhaseType.End, null>

export interface IGame {
  players: {
    [key: number]: IPlayerData,
  }
  board: IBoard
  phase: GamePhase
  firstPlayer: PlayerID
}
