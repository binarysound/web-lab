import * as Core from '@/not-a-bean/core'
import * as NotABean from '@/not-a-bean/models'

describe('function `applyAction`', () => {
  const playerCount = 4
  const playerIDs = Array(playerCount).fill(null).map((_, idx) => idx)
  function startGame(game: NotABean.IGame, firstID: NotABean.PlayerID): NotABean.IGame {
    return Core.applyAction(game, {
      payload: {
        firstPlayer: firstID,
      },
      type: NotABean.GameActionType.StartGame,
    })
  }
  function playCard(
    game: NotABean.IGame, cardPlayerID: NotABean.PlayerID, playedCardIdx: number,
  ): NotABean.IGame {
    return Core.applyAction(game, {
      payload: {
        cardIdx: playedCardIdx,
        playerID: cardPlayerID,
      },
      type: NotABean.GameActionType.PlayCard,
    })
  }
  function selectCard(
    game: NotABean.IGame, selectPlayerID: NotABean.PlayerID, selectedCardIdx: number,
  ): NotABean.IGame {
    return Core.applyAction(game, {
      payload: {
        playerID: selectPlayerID,
        selectedIdx: selectedCardIdx,
      },
      type: NotABean.GameActionType.SelectCard,
    })
  }

  describe('starting from `PhaseType.BeforeStart`', () => {
    let initialGame: NotABean.IGame
    let firstPlayerID: NotABean.PlayerID

    beforeEach(() => {
      initialGame = Core.generateInitialGame(playerCount)
      firstPlayerID = Math.floor(Math.random() * playerCount)
    })

    it ('should be able to start game with `GameActionType.StartGame`', () => {
      const startedGame = startGame(initialGame, firstPlayerID)

      expect(startedGame.board).toEqual(initialGame.board)
      expect(startedGame.firstPlayer).toEqual(firstPlayerID)
      expect(startedGame.phase).toEqual({
        payload: null,
        type: NotABean.PhaseType.WaitForFirstCard,
      })
      expect(startedGame.players).toEqual(initialGame.players)
    })

    it ('should not be able to accept other actions', () => {
      expect(() => { playCard(initialGame, 0, 0) }).toThrow(/PlayCard/)
      expect(() => { selectCard(initialGame, 0, 0) }).toThrow(/SelectCard/)
    })
  })

  describe('starting from `PhaseType.WaitForFirstCard`', () => {
    let startedGame: NotABean.IGame
    let firstPlayerID: NotABean.PlayerID

    beforeEach(() => {
      firstPlayerID = Math.floor(Math.random() * playerCount)
      startedGame = startGame(Core.generateInitialGame(playerCount), firstPlayerID)
    })

    it('should accept first player\'s card', () => {
      const cardPlayed = playCard(startedGame, firstPlayerID, 0)

      expect(cardPlayed.board.cardsPlayed[0]).toEqual({
        card: startedGame.players[firstPlayerID].hand[0].private,
        playerID: firstPlayerID,
      })
      expect(cardPlayed.board.cardsPlayed.length).toBe(1)
      expect(cardPlayed.firstPlayer).toEqual(firstPlayerID)
      expect(cardPlayed.phase).toEqual({
        payload: {
          notYetPlayedIDs: playerIDs.filter((x) => x !== firstPlayerID),
        },
        type: NotABean.PhaseType.WaitForOtherCards,
      })
      Array(playerCount).fill(null).map((_, idx) => {
        if (idx === firstPlayerID) {
          expect(cardPlayed.players[idx].hand).toEqual(startedGame.players[idx].hand.slice(1))
          expect(cardPlayed.players[idx].cardsAcquired).toEqual(
            startedGame.players[idx].cardsAcquired,
          )
        } else {
          expect(cardPlayed.players[idx]).toEqual(startedGame.players[idx])
        }
      })
    })

    it('should only accept first player\'s card', () => {
      const cardPlayerID = playerIDs.filter(
        (x) => x !== firstPlayerID,
      )[Math.floor(Math.random() * (playerCount - 1))]
      expect(() => { playCard(startedGame, cardPlayerID, 0) }).toThrow(/first player/)
    })

    it('should not be able to accept other actions', () => {
      expect(() => { startGame(startedGame, 0) }).toThrow(/StartGame/)
      expect(() => { selectCard(startedGame, 0, 0) }).toThrow(/SelectCard/)
    })
  })

  describe('starting from `PhaseType.WaitForOtherCards`', () => {
    let firstPlayerPlayed: NotABean.IGame
    let firstPlayerID: NotABean.PlayerID

    beforeEach(() => {
      firstPlayerID = Math.floor(Math.random() * playerCount)
      firstPlayerPlayed = playCard(
        startGame(
          Core.generateInitialGame(playerCount), firstPlayerID,
        ), firstPlayerID, 0,
      )
    })

    it('should accept other player\'s card', () => {
      const cardPlayerID = playerIDs.filter(
        (x) => x !== firstPlayerID,
      )[Math.floor(Math.random() * (playerCount - 1))]
      const anotherPlayerPlayed = playCard(firstPlayerPlayed, cardPlayerID, 0)

      expect(anotherPlayerPlayed.board.cardsPlayed.slice(0, -1)).toEqual(
        firstPlayerPlayed.board.cardsPlayed,
      )
      expect(anotherPlayerPlayed.board.cardsPlayed[1]).toEqual({
        card: firstPlayerPlayed.players[cardPlayerID].hand[0].private,
        playerID: cardPlayerID,
      })
      expect(anotherPlayerPlayed.board.cardsPlayed.length).toBe(2)
      expect(anotherPlayerPlayed.firstPlayer).toEqual(firstPlayerID)
      expect(anotherPlayerPlayed.phase).toEqual({
        payload: {
          notYetPlayedIDs: playerIDs.filter((x) => x !== firstPlayerID && x !== cardPlayerID),
        },
        type: NotABean.PhaseType.WaitForOtherCards,
      })
      Array(playerCount).fill(null).map((_, idx) => {
        if (idx === cardPlayerID) {
          expect(anotherPlayerPlayed.players[idx].hand).toEqual(
            firstPlayerPlayed.players[idx].hand.slice(1),
          )
          expect(anotherPlayerPlayed.players[idx].cardsAcquired).toEqual(
            firstPlayerPlayed.players[idx].cardsAcquired,
          )
        } else {
          expect(anotherPlayerPlayed.players[idx]).toEqual(firstPlayerPlayed.players[idx])
        }
      })
    })
  })
})
