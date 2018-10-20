import React from 'react'

import { Screen } from '@/client/components/Screen'
// import { Card } from '@/not-a-bean/client/components/Card'

export class NotABean extends React.Component {
  public render() {
    return (
      <Screen>
        NOT A BEAN
        {/*
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
        })}*/}
      </Screen>
    )
  }
}
