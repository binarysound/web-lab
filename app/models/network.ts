import { NotABeanClientMsg, NotABeanServerMsg } from '@/not-a-bean/models/message'

export interface IServerMessage {
  notABean?: NotABeanServerMsg
}

export interface IClientMessage {
  notABean?: NotABeanClientMsg
}
