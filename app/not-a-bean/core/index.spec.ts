import * as Core from '@/not-a-bean/core'
import * as NotABean from '@/not-a-bean/models'

describe('function applyAction', () => {
  let initialGame: NotABean.IGame
  const playerCount = 4
  const playerIDs = Array(playerCount).fill(null).map((_, idx) => idx)
  let firstPlayerID: NotABean.PlayerID
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

  beforeEach(() => {
    initialGame = Core.generateInitialGame(playerCount)
    firstPlayerID = Math.floor(Math.random() * playerCount)
  })

  it('should be able to start the game', () => {
    const startedGame = startGame(initialGame, firstPlayerID)
    expect(startedGame.board).toEqual(initialGame.board)
    expect(startedGame.firstPlayer).toEqual(firstPlayerID)
    expect(startedGame.phase).toEqual({
      payload: null,
      type: NotABean.PhaseType.WaitForFirstCard,
    })
    expect(startedGame.players).toEqual(initialGame.players)
  })

  it('should accept first player\'s card', () => {
    const cardPlayed = playCard(
      startGame(initialGame, firstPlayerID), firstPlayerID, 0,
    )
    expect(cardPlayed.board.cardsPlayed[0])
      .toEqual({
        card: initialGame.players[firstPlayerID].hand[0].private,
        playerID: firstPlayerID,
      })
    expect(cardPlayed.board.cardsPlayed.length).toBe(1)
    expect(cardPlayed.firstPlayer).toEqual(firstPlayerID)
    expect(cardPlayed.phase).toEqual({
      payload: {
        waitingID: playerIDs.filter((x) => x !== firstPlayerID),
      },
      type: NotABean.PhaseType.WaitForOtherCards,
    })
    for (let i = 0; i < playerCount; i++) {
      if (i === firstPlayerID) {
        expect(cardPlayed.players[i].hand).toEqual(initialGame.players[i].hand.slice(1))
        expect(cardPlayed.players[i].cardsAcquired).toEqual(initialGame.players[i].cardsAcquired)
      } else {
        expect(cardPlayed.players[i]).toEqual(initialGame.players[i])
      }
    }
  })
})
