import produce from 'immer'

import { AppAction } from '@/client/actions'
import { AppState } from '@/models/appState'

const initialState: AppState.IEnv = {}

export default produce((
  draft: AppState.IEnv,
  action: AppAction,
) => {
  switch (action.type) {
  }
  return draft
}, initialState)
