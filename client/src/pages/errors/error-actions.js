/**
 * ./client/src/pages/erros/error-action
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Types ========================================================================================= */
import { SET_ERROR, REMOVE_ERROR } from '../../actions/types'

/* Actions ======================================================================================= */
export const setError = () => {
  return {
    type: SET_ERROR
  }
}

export const removeError = () => {
  return {
    type: REMOVE_ERROR
  }
}
