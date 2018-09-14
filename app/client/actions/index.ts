import { IClientMessage, IServerMessage } from '@/models/network'

export namespace AppAction {
  export enum Type {
    ENV_SAVE_SERVER_MESSAGE = 'ENV_SAVE_SERVER_MESSAGE',
    SAGA_PUSH_CLIENT_MESSAGE = 'SAGA_PUSH_CLIENT_MESSAGE',
  }

  export interface IBase<A extends Type, P extends object> {
    type: A
    payload: P
  }

  export type ENV_SAVE_SERVER_MESSAGE = IBase<Type.ENV_SAVE_SERVER_MESSAGE, {
    serverMessage: IServerMessage,
  }>

  export type SAGA_PUSH_CLIENT_MESSAGE = IBase<Type.SAGA_PUSH_CLIENT_MESSAGE, {
    message: IClientMessage,
  }>
}

export type AppAction =
  AppAction.ENV_SAVE_SERVER_MESSAGE |
  AppAction.SAGA_PUSH_CLIENT_MESSAGE
