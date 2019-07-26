import { combineReducers } from 'redux'
import ItemReducer from './item-Reducer'

export default combineReducers({
  items: ItemReducer
})
