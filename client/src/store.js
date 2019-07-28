/**
 * ./client/src/store
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

/* Reducers ====================================================================================== */
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

/* Exports ======================================================================================= */
export default store
