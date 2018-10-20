import produce from 'immer'

import { AppAction } from '@/client/actions'
import { AppState } from '@/models/appState'

const initialState: AppState.IEnv = {
  serverMessage: {
    body: 'No message received.',
  },
}

export default produce((
  draft: AppState.IEnv,
  action: AppAction,
) => {
  switch (action.type) {
    case AppAction.Type.ENV_SAVE_SERVER_MESSAGE: {
      draft.serverMessage = (action as AppAction.ENV_SAVE_SERVER_MESSAGE).payload.serverMessage
      return draft
    }
  }
  return draft
}, initialState)
