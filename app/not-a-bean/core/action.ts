import * as NotABean from '@/not-a-bean/models'
import produce from 'immer'

export function applyAction(game: NotABean.IGame, action: NotABean.GameAction): NotABean.IGame {
  if (action.type === NotABean.GameActionType.StartGame) {
    return applyStartGame(game, action.payload.firstPlayer)
  } else if (action.type === NotABean.GameActionType.PlayCard) {
    return applyPlayCard(game, action.payload.playerID, action.payload.cardIdx)
  } else if (action.type === NotABean.GameActionType.SelectCard) {
    return applySelectCard(game, action.payload.playerID, action.payload.selectedIdx)
  }
  throw new Error('Action type `${action.type}` is not supported.')
}

function applyStartGame(game: NotABean.IGame, firstPlayerID: NotABean.PlayerID): NotABean.IGame {
  return produce(game, (draft) => {
    if (game.phase.type !== NotABean.PhaseType.BeforeStart) {
      throw new Error('`StartGame` is not applicable.')
    }
    if (!(firstPlayerID in game.players)) {
      throw new Error('First player is not in players list.')
    }

    // Set first player and let the game start
    draft.firstPlayer = firstPlayerID
    draft.phase = {
      payload: null,
      type: NotABean.PhaseType.WaitForFirstCard,
    }
  })
}

function applyPlayCard(
  game: NotABean.IGame, cardPlayerID: NotABean.PlayerID, cardIdx: number,
): NotABean.IGame {
  return produce(game, (draft) => {
    if (game.phase.type !== NotABean.PhaseType.WaitForFirstCard &&
        game.phase.type !== NotABean.PhaseType.WaitForOtherCards) {
          throw new Error('`PlayCard` is not applicable.')
    }
    const playedCard = draft.players[cardPlayerID].hand[cardIdx].private
    if (!playedCard) {
      throw new Error('No card information.')
    }
    if (game.phase.type === NotABean.PhaseType.WaitForFirstCard) {
      // First player plays the card
      if (cardPlayerID !== game.firstPlayer) {
        throw new Error('Card player should be the first player.')
      }

      // Remove the played card from hand
      draft.players[cardPlayerID].hand.splice(cardIdx, 1)
      // Add the played card to board
      draft.board.cardsPlayed.push({
        card: playedCard,
        playerID: cardPlayerID,
      })
      // Move to next phase (let the other players play the card)
      const allPlayers = Object.keys(draft.players).map((id) => parseInt(id, 10))
      draft.phase = {
        payload: {
          notYetPlayedIDs: allPlayers.filter((id) => id !== game.firstPlayer),
        },
        type: NotABean.PhaseType.WaitForOtherCards,
      }
    } else if (game.phase.type === NotABean.PhaseType.WaitForOtherCards) {
      // Other player plays the card
      if (game.phase.payload.notYetPlayedIDs.indexOf(cardPlayerID) === -1) {
        throw new Error('Player with ID ${cardPlayerID} is not in `notYetPlayedIDs` list.')
      }

      // Remove the played card from hand
      draft.players[cardPlayerID].hand.splice(cardIdx, 1)
      // Add the played card to board
      draft.board.cardsPlayed.push({
        card: playedCard,
        playerID: cardPlayerID,
      })
      // Phase modification
      if (game.phase.payload.notYetPlayedIDs.length === 1) {
        // If it is the last required card
        // Move to next phase (card selecting)
        draft.phase = {
          payload: {
            selectingPlayerID: game.firstPlayer,
          },
          type: NotABean.PhaseType.WaitForSelection,
        }
      } else {
        // Remove the player from waiting list
        draft.phase = {
          payload: {
            notYetPlayedIDs: game.phase.payload.notYetPlayedIDs.filter((id) => id !== cardPlayerID),
          },
          type: NotABean.PhaseType.WaitForOtherCards,
        }
      }
    }
  })
}

function applySelectCard(
  game: NotABean.IGame, selPlayerID: NotABean.PlayerID, selectedIdx: number,
): NotABean.IGame {
  return produce(game, (draft) => {
    if (game.phase.type !== NotABean.PhaseType.WaitForSelection) {
      throw new Error('`SelectCard` is not applicable.')
    }
    if (game.phase.payload.selectingPlayerID !== selPlayerID) {
      throw new Error('Player with ID ${selPlayerID} cannot select the card now.')
    }
    const selectedCard = game.board.cardsPlayed[selectedIdx]
    if (game.board.cardsPlayed.length !== 1 &&
        selectedCard.playerID === game.firstPlayer) {
          // A player cannot select the first player's card
          // until it's the last card remaining
          // Also, the player could not select the card from himself
          // which is covered by the condition
          throw new Error('First player\'s card cannot be selected now.')
    }

    // Remove the card from board
    draft.board.cardsPlayed.splice(selectedIdx, 1)
    // Add the card to player's acquired card
    draft.players[selPlayerID].cardsAcquired.push(selectedCard.card)
    // Phase modification
    if (game.board.cardsPlayed.length !== 1) {
      // If there was more than one card on the board
      // Keep selecting
      draft.phase = {
        payload: {
          selectingPlayerID: selectedCard.playerID,
        },
        type: NotABean.PhaseType.WaitForSelection,
      }
    } else if (game.players[0].hand.length !== 0) {
      // If there was only one card on the board
      // but the players still have cards in the hand
      // Go on to the next round (card play)
      draft.firstPlayer = selectedCard.playerID
      draft.phase = {
        payload: null,
        type: NotABean.PhaseType.WaitForFirstCard,
      }
    } else {
      // If there was only one card on the board
      // and players played every card
      // End the game
      draft.phase = {
        payload: null,
        type: NotABean.PhaseType.End,
      }
    }
  })
}
