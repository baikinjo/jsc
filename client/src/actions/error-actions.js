import { SET_ERROR, REMOVE_ERROR } from './types'

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
