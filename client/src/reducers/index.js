import { combineReducers } from 'redux'
import itemReducer from './item-Reducer'

export default combineReducers({
  item: itemReducer
})
