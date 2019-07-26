import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner
} from 'reactstrap'

import { getItems, deleteItem } from '../actions/item-actions'

class ItemTable extends React.Component {
  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    const { loading } = this.props

    if (loading) {
      return (
        <div>
          <Spinner type='grow' color='primary' />
          <Spinner type='grow' color='secondary' />
          <Spinner type='grow' color='success' />
          <Spinner type='grow' color='danger' />
          <Spinner type='grow' color='warning' />
          <Spinner type='grow' color='info' />
          <Spinner type='grow' color='light' />
          <Spinner type='grow' color='dark' />
        </div>
      )
    }

    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th />
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </Table>
    )
  }

  renderRows() {
    const { items } = this.props

    return items.data.map(item => {
      return (
        <tr key={item._id}>
          <th scope='row'>{item.asin}</th>
          <td>
            <Button onClick={this.toggle} close />
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Delete Item</ModalHeader>
              <ModalBody>Are you sure you want to delete the item?</ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  onClick={() => {
                    this.props.deleteItem(item._id)
                  }}
                >
                  Delete
                </Button>
                {'   '}
                <Button color='secondary' onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </td>
        </tr>
      )
    })
  }

  componentDidMount() {
    const { getItems } = this.props
    getItems()
  }
}

const mapStateToProps = ({ items }) => {
  const loading = items.loading

  return {
    loading,
    items
  }
}

export default connect(
  mapStateToProps,
  {
    getItems,
    deleteItem
  }
)(ItemTable)
