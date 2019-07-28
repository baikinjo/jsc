/**
 * ./client/src/reducers/index
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import { combineReducers } from 'redux'

/* Reducers ====================================================================================== */
import ItemReducer from '../pages/items/item-reducer'
import ErrorReducer from '../pages/errors/error-reducer'

/* Exports ======================================================================================= */
export default combineReducers({
  items: ItemReducer,
  errors: ErrorReducer
})
