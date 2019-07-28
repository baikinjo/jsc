/**
 * ./client/src/pages/app/app
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import React from 'react'
import { Container } from 'reactstrap'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

/* Components ==================================================================================== */
import AppNavbar from './app-navbar'
import ItemTable from '../items/components/item-table'
import ItemModal from '../items/components/item-modal'
import store from '../../store'

/* <App /> ======================================================================================= */
function app() {
  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <ItemModal />
          <ItemTable />
        </Container>
      </div>
    </Provider>
  )
}

/* Exports ======================================================================================= */
export default app
