import { RouterState } from 'connected-react-router'

import { IServerMessage } from '@/models/network'
import { INotABeanState } from '@/not-a-bean/client/models'

export namespace AppState {
  export interface IEnv {
    serverMessage: IServerMessage
  }
}

export interface IAppState {
  env: AppState.IEnv
  router: RouterState
  notABean: INotABeanState
}
