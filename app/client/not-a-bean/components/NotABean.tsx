import React from 'react'

import { Card } from '@/client/not-a-bean/components/Card'
import { Screen } from '@/client/not-a-bean/components/Screen'

export class NotABean extends React.Component {
  public render() {
    return (
      <Screen>
        {Array(4).fill(null).map((_, suit) => {
          return (
            <div key={suit}>
              {Array(10).fill(null).map((__, idx) => (
                <Card
                  width={100}
                  key={idx}
                  suit={suit}
                  number={idx + 1}
                />
              ))}
            </div>
          )
        })}
      </Screen>
    )
  }
}
