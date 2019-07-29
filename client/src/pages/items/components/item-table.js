/**
 * ./client/src/pages/items/components/item-table
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Alert
} from 'reactstrap'

/* Actions ======================================================================================= */
import { getItems, deleteItem } from '../item-actions'
import { removeError } from '../../errors/error-actions'

/* <ItemTable /> ================================================================================= */
class ItemTable extends React.Component {
  state = {
    modal: false,
    itemId: null,
    itemASIN: ''
  }

  /** Modal turn on/off as well as seed the item info upon delete button onClick */
  toggle = (item = null) => {
    this.setState({
      modal: !this.state.modal,
      itemId: item._id,
      itemASIN: item.asin
    })
  }

  /** Main render method */
  render() {
    const { loading, occured } = this.props
    console.log(this.props)

    if (loading) {
      if (occured) {
        return (
          <div>
            <Alert color='dark'>
              The Product does not exist,
              <Button color='link' onClick={() => this.refresh()}>
                click here
              </Button>
              to return.
            </Alert>
          </div>
        )
      }
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
          <Alert color='light'>Fetching Data...</Alert>
        </div>
      )
    }

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ASIN</th>
            <th>Category</th>
            <th>Dimensions</th>
            <th>Rank</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </Table>
    )
  }

  /** Renders mapped item into a rows with delete modal */
  renderRows() {
    const { items } = this.props
    const { modal, itemId, itemASIN } = this.state

    return items.data.map(item => {
      return (
        <tr key={item._id}>
          <th scope='row'>
            <a href={item.baseURL} rel='noopener noreferrer' target='_blank'>
              {item.asin}
            </a>
          </th>
          <td>{item.category}</td>
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
                    this.setState({ modal: !this.state.modal })
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

  /** item_id will send to api */
  onDelete(id) {
    this.props.deleteItem(id)
  }

  /** removes any error generated from props and refresh the page */
  refresh() {
    this.props.removeError()
    this.props.getItems()
  }

  /** Mounting items props */
  componentDidMount() {
    const { getItems } = this.props
    getItems()
  }
}

const mapStateToProps = ({ items, errors }) => {
  const loading = items.loading
  const occured = errors.occured

  return {
    loading,
    occured,
    items,
    errors
  }
}

/* Exports ======================================================================================= */
export default connect(
  mapStateToProps,
  {
    getItems,
    deleteItem,
    removeError
  }
)(ItemTable)
