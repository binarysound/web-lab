import { IServerMessage } from '@/models/network'

export namespace AppState {
  export interface IEnv {
    serverMessage: IServerMessage
  }
}

export interface IAppState {
  env: AppState.IEnv
}
