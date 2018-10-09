import React from 'react'
import styled, { StyledFunction } from 'styled-components'

import { CARD_HEIGHT_TO_WIDTH_RATIO, numOfSymbolsToSymbolLayout } from '@/client/not-a-bean/ui/card'

interface ISvgProps {
  cardWidth: number
}

const styledSvg: StyledFunction<ISvgProps & React.SVGProps<{}>> = styled.svg as any

const Svg = styledSvg`
  filter: drop-shadow(0 0 ${(props) => props.cardWidth / 10}px rgba(0, 0, 0, 0.5));
  width: ${(props) => props.cardWidth}px;
  height: ${(props) => props.cardWidth * CARD_HEIGHT_TO_WIDTH_RATIO}px;
  transition: filter 0.5s ease;

  :hover {
    filter: drop-shadow(0 0 ${(props) => props.cardWidth / 5}px rgba(0, 0, 0, 0.5));
    cursor: pointer;
  }

  .card {
    width: 100%;
    height: 100%;
  }

  .text {
    user-select: none;
    text-anchor: middle;
    dominant-baseline: middle;
    font-size: ${(props) => props.cardWidth * 0.12}px;
    font-weight: 700;
  }

  .upper {
    transform: translate(
      ${(props) => props.cardWidth / 5}px,
      ${(props) => props.cardWidth / 5}px);
  }

  .lower {
    transform:
      translate(
        ${(props) => props.cardWidth * 4 / 5}px,
        ${(props) => props.cardWidth * CARD_HEIGHT_TO_WIDTH_RATIO - props.cardWidth / 5}px)
      rotate(180deg);
  }
`

/**
 * Get coordinates of the control point of the Q curve that joins given two points.
 * Resulting point divides segment of midpoint of given two points and center(0.5, 0.5) by 3:2.
 * Range of each component is 0 <= x, y <= 1.
 * @param x1 x coordinate of the first point
 * @param y1 y coordinate of the second point
 * @param x2 x coordinate of the first point
 * @param y2 y coordinate of the second point
 */
function getControlPointFor(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2
  const center = 0.5
  const ratio = 0.6

  return {
    x: midX + (center - midX) * ratio,
    y: midY + (center - midY) * ratio,
  }
}

/**
 * Get `d` attribute of SVG `path` that represents a symbol.
 * @param suit 0: spade, 1: heart, 2: clover, 3: diamond
 * @param size Width and height of the symbol in px.
 */
function getSymbolPathD(suit: number, size: number): string {
  const tailBottomLeftX = 0.3959731544
  const tailPath =
    `M ${size / 2} ${size / 2}` +
    `L ${size * tailBottomLeftX} ${size}` +
    `L ${size * (1 - tailBottomLeftX)} ${size} Z`

  if (suit === 0) {
    // Spade
    const bottomX = 0.2382550336
    const bottomY = 0.8255033557
    const leftMostX = 0.04362416107
    const leftMostY = 0.6845637584

    return (
      `M ${size * 0.5} 0` +
      `L ${size * leftMostX} ${size * leftMostY}` +
      `L ${size * bottomX} ${size * bottomY}` +
      `Q ${size / 2} ${size / 2}, ${size * (1 - bottomX)} ${size * bottomY}` +
      `L ${size * (1 - leftMostX)} ${size * leftMostY} Z` + tailPath
    )
  } else if (suit === 1) {
    // Heart
    const bottomY = 0.95862068
    const leftMostY = 0.2068965517
    const topX = 0.2068965517
    const topY = 0.04137931034

    return (
      `M ${size * topX} ${size * topY}` +
      `L 0 ${size * leftMostY}` +
      `L ${size * 0.5} ${size * bottomY}` +
      `L ${size} ${size * leftMostY}` +
      `L ${size * (1 - topX)} ${size * topY}` +
      `Q ${size / 2} ${size / 3}, ${size * topX} ${size * topY}`
    )
  } else if (suit === 2) {
    // Clover
    const bottomX = 0.1527777778
    const bottomY = 0.8611111111
    const leftMostY = 0.6006944444
    const topX = 0.3368055556
    const topY = 0.01041666667

    const center1 = getControlPointFor(topX, topY, 0, leftMostY)
    const center2 = getControlPointFor(bottomX, bottomY, 1 - bottomX, bottomY)
    const center3 = getControlPointFor(1, leftMostY, 1 - topX, topY)

    return (
      `M ${size * topX} ${size * topY}` +
      `Q ${size * center1.x} ${size * center1.y}, 0 ${size * leftMostY}` +
      `L ${size * bottomX} ${size * bottomY}` +
      `Q ${size * center2.x} ${size * center2.y},` +
      `${size * (1 - bottomX)} ${size * bottomY}` +
      `L ${size} ${size * leftMostY}` +
      `Q ${size * center3.x} ${size * center3.y},` +
      `${size * (1 - topX)} ${size * topY} Z` + tailPath
    )
  } else if (suit === 3) {
    // Diamond
    const leftMostX = 0.09615384615

    return (
      `M ${size / 2} 0` +
      `L ${size * leftMostX} ${size * 0.5}` +
      `L ${size / 2} ${size}` +
      `L ${size * (1 - leftMostX)} ${size * 0.5} Z`
    )
  }
  return ''
}

function getSuitColor(suit: number): string {
  if (suit === 0) {
    return '#33658A'
  } else if (suit === 1) {
    return '#758E4F'
  } else if (suit === 2) {
    return '#F6AE2D'
  } else if (suit === 3) {
    return '#F26419'
  }
  return ''
}

export class Card extends React.Component<Card.IProps> {
  public render() {
    const { suit, number, width } = this.props
    const suitColor = getSuitColor(suit)
    const roundness = 0.15

    return (
      <Svg cardWidth={width}>
        <rect
          className='card'
          rx={width * roundness}
          ry={width * roundness}
          fill='white'
        />
        <text fill={suitColor} className='text upper'>
          {number}
        </text>
        <text fill={suitColor} className='text lower'>
          {number}
        </text>
        {this.renderSymbols()}
      </Svg>
    )
  }

  private renderSymbols() {
    const { width, suit, number } = this.props
    const height = width * CARD_HEIGHT_TO_WIDTH_RATIO
    const symbols = numOfSymbolsToSymbolLayout[number]

    if (symbols) {
      return symbols.map((symbol, idx) => {
        const { x, y, reversed } = symbol

        const widthMargin = width / 3
        const heightMargin = height / 3

        const xOrigin = width / 2
        const yOrigin = height / 2

        const xUnit = (width - widthMargin) / 3
        const yUnit = (height - heightMargin) / 7

        const symbolSize = width / 10

        return (
          <path
            d={getSymbolPathD(suit, symbolSize)}
            key={idx}
            fill={getSuitColor(suit)}
            style={{
              height: symbolSize,
              transform: `translate(` +
                `${x * xUnit + xOrigin}px,` +
                `${y * yUnit + yOrigin}px)` +
                (reversed ? ' rotate(180deg)' : '') +
                ` translate(${-symbolSize / 2}px, ${-symbolSize / 2}px)`,
              width: symbolSize,
            }}
          />
        )
      })
    }
    return null
  }
}

namespace Card {
  export interface IProps {
    suit: number
    number: number
    width: number
  }
}
