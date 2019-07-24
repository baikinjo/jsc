import React from 'react'
import AppNavbar from './components/app-navbar'
import ItemList from './components/item-list'
import ItemModal from './components/item-modal'
import { Container } from 'reactstrap'

import { Provider } from 'react-redux'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <ItemModal />
          <ItemList />
        </Container>
      </div>
    </Provider>
  )
}

export default App
