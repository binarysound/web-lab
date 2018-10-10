interface ISymbol {
  x: number  // from -1 to 1
  y: number  // from -3 to 3
  reversed: boolean
}

export const CARD_HEIGHT_TO_WIDTH_RATIO = 1.6

export const numOfSymbolsToSymbolLayout: {[key: number]: ISymbol[]} = {
  1: [
    {
      reversed: false,
      x: 0,
      y: 0,
    },
  ],

  2: [
    {
      reversed: false,
      x: 0,
      y: -2,
    },
    {
      reversed: true,
      x: 0,
      y: 2,
    },
  ],

  3: [
    {
      reversed: false,
      x: 0,
      y: -2,
    },
    {
      reversed: false,
      x: 0,
      y: 0,
    },
    {
      reversed: true,
      x: 0,
      y: 2,
    },
  ],

  4: [
    {
      reversed: false,
      x: -1,
      y: -2,
    },
    {
      reversed: false,
      x: 1,
      y: -2,
    },
    {
      reversed: true,
      x: -1,
      y: 2,
    },
    {
      reversed: true,
      x: 1,
      y: 2,
    },
  ],

  5: [
    {
      reversed: false,
      x: -1,
      y: -2,
    },
    {
      reversed: false,
      x: 1,
      y: -2,
    },
    {
      reversed: true,
      x: -1,
      y: 2,
    },
    {
      reversed: true,
      x: 1,
      y: 2,
    },
    {
      reversed: false,
      x: 0,
      y: 0,
    },
  ],

  6: [
    {
      reversed: false,
      x: -1,
      y: -1,
    },
    {
      reversed: false,
      x: 0,
      y: -2,
    },
    {
      reversed: true,
      x: 1,
      y: -1,
    },
    {
      reversed: true,
      x: -1,
      y: 1,
    },
    {
      reversed: false,
      x: 0,
      y: 2,
    },
    {
      reversed: true,
      x: 1,
      y: 1,
    },
  ],

  7: [
    {
      reversed: false,
      x: -1,
      y: -1,
    },
    {
      reversed: false,
      x: 0,
      y: -2,
    },
    {
      reversed: true,
      x: 1,
      y: -1,
    },
    {
      reversed: true,
      x: -1,
      y: 1,
    },
    {
      reversed: false,
      x: 0,
      y: 2,
    },
    {
      reversed: true,
      x: 1,
      y: 1,
    },
    {
      reversed: false,
      x: 0,
      y: 0,
    },
  ],

  8: [
    {
      reversed: false,
      x: -1,
      y: -2,
    },
    {
      reversed: true,
      x: -1,
      y: 0,
    },
    {
      reversed: true,
      x: -1,
      y: 2,
    },
    {
      reversed: false,
      x: 1,
      y: -2,
    },
    {
      reversed: true,
      x: 1,
      y: 0,
    },
    {
      reversed: true,
      x: 1,
      y: 2,
    },
    {
      reversed: false,
      x: 0,
      y: -3,
    },
    {
      reversed: true,
      x: 0,
      y: 3,
    },
  ],

  9: [
    {
      reversed: false,
      x: -1,
      y: -2,
    },
    {
      reversed: true,
      x: -1,
      y: 0,
    },
    {
      reversed: true,
      x: -1,
      y: 2,
    },
    {
      reversed: false,
      x: 1,
      y: -2,
    },
    {
      reversed: true,
      x: 1,
      y: 0,
    },
    {
      reversed: true,
      x: 1,
      y: 2,
    },
    {
      reversed: false,
      x: 0,
      y: -3,
    },
    {
      reversed: false,
      x: 0,
      y: -1,
    },
    {
      reversed: true,
      x: 0,
      y: 3,
    },
  ],

  10: [
    {
      reversed: true,
      x: -1,
      y: -2,
    },
    {
      reversed: false,
      x: -1,
      y: 0,
    },
    {
      reversed: false,
      x: -1,
      y: 2,
    },
    {
      reversed: true,
      x: 1,
      y: -2,
    },
    {
      reversed: false,
      x: 1,
      y: 0,
    },
    {
      reversed: false,
      x: 1,
      y: 2,
    },
    {
      reversed: false,
      x: 0,
      y: -3,
    },
    {
      reversed: false,
      x: 0,
      y: -1,
    },
    {
      reversed: false,
      x: 0,
      y: 1,
    },
    {
      reversed: true,
      x: 0,
      y: 3,
    },
  ],
}
