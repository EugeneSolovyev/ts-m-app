import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import User from './user'

export default createStore(
  combineReducers({ User }),
  applyMiddleware(thunk)
)
