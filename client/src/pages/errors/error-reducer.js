/**
 * ./client/src/pages/erros/error-reducer
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Actions ======================================================================================= */
import { ADD_ERROR, SET_ERROR, REMOVE_ERROR } from '../../actions/types'

/* Constants ===================================================================================== */
const initialState = {
  occured: false
}

export default function(state = initialState, action) {
  const { error } = action
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        error
      }
    case SET_ERROR:
      return {
        ...state,
        occured: true
      }
    case REMOVE_ERROR:
      return {
        occured: false
      }
    default:
      return state
  }
}
