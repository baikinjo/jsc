import { combineReducers } from 'redux'
import ItemReducer from './item-Reducer'
import ErrorReducer from './error-Reducer'

export default combineReducers({
  items: ItemReducer,
  errors: ErrorReducer
})
