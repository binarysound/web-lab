import produce from 'immer'

import { NotABeanAction } from '@/not-a-bean/client/actions'
import { INotABeanState } from '@/not-a-bean/client/models'

const initialState: INotABeanState = {
  game: null,
}

export default produce((
  draft: INotABeanState,
  action: NotABeanAction,
) => {
  switch (action.type) {
    case NotABeanAction.Type.NAB_UPDATE_GAME: {
      draft.game = action.payload.game
      return draft
    }
  }
  return draft
}, initialState)
