import { combineReducers } from 'redux'

import env from '@/client/reducers/env'
import notABean from '@/not-a-bean/client/reducers'

export default combineReducers({
  env,
  notABean,
})
