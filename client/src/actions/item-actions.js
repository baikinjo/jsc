import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'

export const getItems = () => {
  return dispatch => {
    dispatch(setItemsLoading())
    axios.get('/api/items').then(res =>
      dispatch({
        type: GET_ITEMS,
        data: res.data.items
      })
    )
  }
}

export const addItem = item => dispatch => {
  axios.post('/api/items', item).then(res =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  )
}

export const deleteItem = itemId => {
  return dispatch => {
    dispatch(setItemsLoading())
    axios.delete(`/api/items/${itemId}`).then(() => {
      dispatch({ type: DELETE_ITEM })
      dispatch(getItems())
    })
  }
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
