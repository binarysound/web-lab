import { RouterAction } from 'connected-react-router'

import { IClientMessage } from '@/models/network'
import { NotABeanAction } from '@/not-a-bean/client/actions'

export namespace AppAction {
  export enum Type {
    SAGA_PUSH_CLIENT_MESSAGE = 'SAGA_PUSH_CLIENT_MESSAGE',
  }

  export interface IBase<A extends Type, P extends object> {
    readonly type: A
    readonly payload: P
  }

  export type SAGA_PUSH_CLIENT_MESSAGE = IBase<Type.SAGA_PUSH_CLIENT_MESSAGE, {
    message: IClientMessage,
  }>
}

export type AppAction =
  RouterAction |
  AppAction.SAGA_PUSH_CLIENT_MESSAGE |
  NotABeanAction
