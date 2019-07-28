import axios from 'axios'
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ADD_ERROR,
  SET_ERROR
} from './types'

export const getItems = () => {
  return dispatch => {
    dispatch(setItemsLoading())
    axios
      .get('/api/items')
      .then(res =>
        dispatch({
          type: GET_ITEMS,
          data: res.data.items
        })
      )
      .catch(err => {
        dispatch({
          type: SET_ERROR
        })
        dispatch({
          type: ADD_ERROR,
          error: err
        })
      })
  }
}

export const addItem = item => {
  return dispatch => {
    dispatch(setItemsLoading())
    axios
      .post('/api/items', item)
      .then(() => {
        dispatch({ type: ADD_ITEM })
        dispatch(getItems())
      })
      .catch(err => {
        dispatch({
          type: SET_ERROR
        })
        dispatch({
          type: ADD_ERROR,
          error: err
        })
      })
  }
}

export const deleteItem = itemId => {
  return dispatch => {
    axios
      .delete(`/api/items/${itemId}`)
      .then(() => {
        dispatch({ type: DELETE_ITEM })
        dispatch(getItems())
      })
      .catch(err => {
        dispatch({
          type: SET_ERROR
        })
        dispatch({
          type: ADD_ERROR,
          error: err
        })
      })
  }
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
