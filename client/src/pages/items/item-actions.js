/**
 * ./client/src/pages/items/item-actions
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import axios from 'axios'

/* Types ========================================================================================= */
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ADD_ERROR,
  SET_ERROR
} from '../../actions/types'

/* Actions ======================================================================================= */

/** Get all list of itmes stored from the database dispatch GET_ITEMS */
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

/** Create new item dispatch ADD_ITEM or SET_ERROR and ADD_ERROR if any error occurs */
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

/** Delete an item dispatch DELETE_ITEM */
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

/** Sets the loading to true/false depending on getting items, adding items, deleting items */
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
