import * as Core from '@/not-a-bean/core/utils'
import * as NotABean from '@/not-a-bean/models'

describe('function calculateScore', () => {
  it('should return sum of normal cards', () => {
    const normalCardList: NotABean.Card[] = [
      { suit: 0, type: NotABean.CardType.NUMBER, value: 3 },
      { suit: 0, type: NotABean.CardType.NUMBER, value: 2 },
      { suit: 1, type: NotABean.CardType.NUMBER, value: 1 },
      { suit: 2, type: NotABean.CardType.NUMBER, value: 5 },
    ]
    expect(Core.calculateScore(normalCardList)).toBe(11)
  })

  it('should work correctly with special cards', () => {
    const cardList: NotABean.Card[] = [
      { suit: 3, type: NotABean.CardType.NUMBER, value: 2 },
      { suit: 0, type: NotABean.CardType.SPECIAL, value: NotABean.SpecialCardValue.ZEROING },
      { suit: 2, type: NotABean.CardType.SPECIAL, value: NotABean.SpecialCardValue.NEGATION },
      { suit: 2, type: NotABean.CardType.NUMBER, value: 4 },
      { suit: 0, type: NotABean.CardType.NUMBER, value: 2 },
      { suit: 1, type: NotABean.CardType.SPECIAL, value: NotABean.SpecialCardValue.DOUBLE },
      { suit: 2, type: NotABean.CardType.SPECIAL, value: NotABean.SpecialCardValue.DOUBLE },
      { suit: 2, type: NotABean.CardType.NUMBER, value: 10 },
      { suit: 0, type: NotABean.CardType.NUMBER, value: 4 },
    ]
    expect(Core.calculateScore(cardList)).toBe(-26)
  })
})
