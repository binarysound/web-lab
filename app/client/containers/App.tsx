import React from 'react'
import io from 'socket.io-client'

namespace App {
  /* tslint:disable-next-line:no-empty-interface */
  export interface IProps {}

  export interface IState {
    message: string
  }
}

export class App extends React.Component<App.IProps, App.IState> {
  constructor(props: App.IProps) {
    super(props)

    this.state = {
      message: 'No message received.',
    }
  }

  public componentDidMount() {
    const socket = io.connect('/')
    socket.on('server event', (data: any) => {
      this.setState({
        message: data.message,
      })
      socket.emit('client event', { my: 'data' })
    })
  }

  public render() {
    return (
      <div>{this.state.message}</div>
    )
  }
}
