import React from 'react'
import AppNavbar from './app-navbar'
import ItemTable from '../items/components/item-table'
import ItemModal from '../items/components/item-modal'
import { Container } from 'reactstrap'

import { Provider } from 'react-redux'
import store from '../../store'

import 'bootstrap/dist/css/bootstrap.min.css'

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

export default app
