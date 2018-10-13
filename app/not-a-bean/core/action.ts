import * as NotABean from '@/not-a-bean/models'
import produce from 'immer'

export function applyAction(game: NotABean.IGame, action: NotABean.GameAction): NotABean.IGame {
  return produce(game, (draft) => {
    if (action.type === NotABean.GameActionType.StartGame) {
      if (game.phase.type === NotABean.PhaseType.BeforeStart) {
        if (!(action.payload.firstPlayer in game.players)) {
          throw new Error('first player is not in players list')
        }
        // Set first player and let the game start
        draft.firstPlayer = action.payload.firstPlayer
        draft.phase = {
          payload: null,
          type: NotABean.PhaseType.WaitForFirstCard,
        }
      }
    } else if (action.type === NotABean.GameActionType.PlayCard) {
      if (game.phase.type === NotABean.PhaseType.WaitForFirstCard &&
        action.payload.playerID === game.firstPlayer) {
        // First player plays the card
        const id = action.payload.playerID
        const card = draft.players[id].hand[action.payload.cardIdx].private
        if (!card) {
          throw new Error('No card information')
        }
        const playedCard = card
        // Remove the played card from hand
        draft.players[id].hand.splice(action.payload.cardIdx, 1)
        // Add the played card to board
        draft.board.cardsPlayed.push({
          card: playedCard,
          playerID: id,
        })
        // Move to next phase (let the other players play the card)
        const allPlayers = Object.keys(draft.players).map((data) => {
          return parseInt(data, 10)
        })
        draft.phase = {
          payload: {
            waitingID: allPlayers.filter((x) => x !== game.firstPlayer),
          },
          type: NotABean.PhaseType.WaitForOtherCards,
        }
      } else if (game.phase.type === NotABean.PhaseType.WaitForOtherCards) {
        // Other player plays the card
        const id = action.payload.playerID
        if (game.phase.payload.waitingID.indexOf(id) === -1) {
          throw new Error('This player cannot play a card')
        }
        const card = draft.players[id].hand[action.payload.cardIdx].private
        if (!card) {
          throw new Error('No card information')
        }
        const playedCard = card
        // Remove the played card from hand
        draft.players[id].hand.splice(action.payload.cardIdx, 1)
        // Add the played card to board
        draft.board.cardsPlayed.push({
          card: playedCard,
          playerID: id,
        })
        if (game.phase.payload.waitingID.length === 1) {
          // If it is the last required card
          // Move to next phase (selecting)
          draft.phase = {
            payload: {
              selecting: game.firstPlayer,
            },
            type: NotABean.PhaseType.WaitForSelection,
          }
        } else {
          // Remove the player from waiting list
          draft.phase = {
            payload: {
              waitingID: game.phase.payload.waitingID.filter((x) => x !== id),
            },
            type: NotABean.PhaseType.WaitForOtherCards,
          }
        }
      }
    } else if (action.type === NotABean.GameActionType.SelectCard) {
      if (game.phase.type === NotABean.PhaseType.WaitForSelection) {
        if (action.payload.playerID === game.phase.payload.selecting) {
          // A player select the card
          const id = action.payload.playerID
          const selectedCard = game.board.cardsPlayed[action.payload.selectedIdx]
          if (game.board.cardsPlayed.length !== 1 &&
            selectedCard.playerID === game.firstPlayer) {
            // You cannot select the first player's card
            // until it's the last card remaining
            // Also, the player could not select the card from himself
            // which is covered by the condition
            throw new Error('You cannot select first player\'s card')
          }
          // Remove the card from board
          draft.board.cardsPlayed.splice(action.payload.selectedIdx, 1)
          // Add the card to player's acquired card
          draft.players[id].cardsAcquired.push(selectedCard.card)
          if (game.board.cardsPlayed.length !== 1) {
            // If there was more than one card on the board
            // Keep selecting
            draft.phase = {
              payload: {
                selecting: selectedCard.playerID,
              },
              type: NotABean.PhaseType.WaitForSelection,
            }
          } else if (game.players[0].hand.length !== 0) {
            // If there was only one card on the board
            // and players still have cards in the hand
            // Go on to the next round (card play)
            draft.firstPlayer = selectedCard.playerID
            draft.phase = {
              payload: null,
              type: NotABean.PhaseType.WaitForFirstCard,
            }
          } else {
            // If there was only one card on the board
            // and players don't have any card in the hand,
            // end the game
            draft.phase = {
              payload: null,
              type: NotABean.PhaseType.End,
            }
          }
        }
      }
    } else {
      throw new TypeError('Action not applicable')
    }
  })
}
