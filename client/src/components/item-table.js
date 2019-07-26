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
    modal: false,
    itemId: null,
    itemASIN: ''
  }

  toggle = (item = null) => {
    this.setState({
      modal: !this.state.modal,
      itemId: item._id,
      itemASIN: item.asin
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
            <th>ASIN</th>
            <th>name</th>
            <th>dimension</th>
            <th>rank</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </Table>
    )
  }

  renderRows() {
    const { items } = this.props
    const { modal, itemId, itemASIN } = this.state

    return items.data.map(item => {
      return (
        <tr key={item._id}>
          <th scope='row'>{item.asin}</th>
          <td>{item.name}</td>
          <td>{item.dimension}</td>
          <td>{item.rank}</td>
          <td>
            <Button onClick={() => this.toggle(item)} close />
            <Modal
              isOpen={modal}
              id={itemId}
              asin={itemASIN}
              toggle={this.toggle}
            >
              <ModalHeader
                toggle={this.toggle}
              >{`Delete ${itemASIN}`}</ModalHeader>
              <ModalBody>{`Are you sure you want to delete the ${itemASIN}?`}</ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  onClick={() => {
                    this.onDelete(itemId)
                    this.toggle(item)
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

  onDelete(id) {
    this.props.deleteItem(id)
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
