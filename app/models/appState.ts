import { RouterState } from 'connected-react-router'

import { INotABeanState } from '@/not-a-bean/client/models'

export namespace AppState {
  /* tslint:disable-next-line:no-empty-interface */
  export interface IEnv {}
}

export interface IAppState {
  env: AppState.IEnv
  router: RouterState
  notABean: INotABeanState
}
