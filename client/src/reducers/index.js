import { combineReducers } from 'redux'
import ItemReducer from '../pages/items/item-reducer'
import ErrorReducer from '../pages/errors/error-reducer'

export default combineReducers({
  items: ItemReducer,
  errors: ErrorReducer
})
