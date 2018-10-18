import * as NotABean from '@/not-a-bean/models'

export const NUM_SUITS = 4

function generateDeck(): NotABean.Card[] {
  return Array(60).fill(null).map((_, idx): NotABean.Card => {
    const cardSuit: number = Math.floor(idx / 15)
    if (idx % 15 < 10) {
      return {
        suit: cardSuit,
        type: NotABean.CardType.NUMBER,
        value: idx % 15,
      }
    } else {
      if (idx % 15 === 10) {
        return {
          suit: cardSuit,
          type: NotABean.CardType.SPECIAL,
          value: NotABean.SpecialCardValue.ZEROING,
        }
      } else if (idx % 15 === 11) {
        return {
          suit: cardSuit,
          type: NotABean.CardType.SPECIAL,
          value: NotABean.SpecialCardValue.DOUBLE,
        }
      } else {
        return {
          suit: cardSuit,
          type: NotABean.CardType.SPECIAL,
          value: NotABean.SpecialCardValue.NEGATION,
        }
      }
    }
  })
}

export function generateInitialGame(playerCount: number): NotABean.IGame {
  if (60 % playerCount !== 0) {
    throw new Error('Number of players should be divisor of 60')
  }
  const deck = generateDeck()
  const game: NotABean.IGame = {
    board: {
      cardsPlayed: [],
    },
    firstPlayer: -1, // Initial game has first player ID -1, which is meaningless initial value
    phase: {
      payload: null,
      type: NotABean.PhaseType.BeforeStart,
    },
    players: {},
  }
  game.players = Array(playerCount).fill(null).reduce((acc, _, idx) => {
    acc[idx] = {
      cardsAcquired: [],
      hand: [],
    }
    return acc
  }, {})
  // Deal the card
  while (deck.length > 0) {
    // Deal random card
    const targetPlayer = deck.length % playerCount
    const idx = Math.floor(Math.random() * deck.length)
    game.players[targetPlayer].hand.push({
      __meta: { knownTo: [targetPlayer] },
      private: deck[idx],
      public: {
        isMouseOn: false,
      },
    })
    // Remove card from the deck
    deck.splice(idx, 1)
  }
  return game
}

export function calculateScore(cards: NotABean.Card[]): number {
  return Array(NUM_SUITS).fill(null).reduce((acc, _, suit) => {
    const filteredCards = cards.filter((card) => card.suit === suit)
    return acc + filteredCards.reduce(addCardScore, 0) * filteredCards.reduce(aggSpecialCard, 1)
  }, 0)
}

function addCardScore(acc: number, card: NotABean.Card): number {
  return acc + (card.type === NotABean.CardType.NUMBER ? card.value : 0)
}

function aggSpecialCard(multiplier: number, card: NotABean.Card): number {
  if (card.type === NotABean.CardType.SPECIAL) {
    if (card.value === NotABean.SpecialCardValue.DOUBLE) {
      return multiplier * 2
    } else if (card.value === NotABean.SpecialCardValue.NEGATION) {
      return multiplier * (-1)
    } else if (card.value === NotABean.SpecialCardValue.ZEROING) {
      return 0
    }
  }
  return multiplier
}
