import { ADD_ERROR, SET_ERROR, REMOVE_ERROR } from '../../actions/types'

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
