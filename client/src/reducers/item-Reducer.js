import { GET_ITEMS, ADD_ITEM, ITEMS_LOADING } from '../actions/types'

const initialState = {
  data: [],
  loading: false
}

export default function(state = initialState, action) {
  const { data } = action
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        data,
        loading: false
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
