/**
 * ./client/src/pages/items/components/item-modal
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { connect } from 'react-redux'

/* Actions ======================================================================================= */
import { addItem } from '../item-actions'

/* <item-modal /> ================================================================================ */
class ItemModal extends React.Component {
  state = {
    error: true,
    modal: false,
    asin: ''
  }

  /** toggle to turn modal on/off */
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  /** check regex value to disable/enable button submission */
  onChange = e => {
    let regex = RegExp('^[A-Za-z0-9]{10}$')
    if (regex.test(e.target.value)) {
      this.setState({ error: false })
      this.setState({ [e.target.name]: e.target.value })
    } else {
      this.setState({ error: true })
    }
  }

  /** generic submit button where value enterend will pass on to api */
  onSubmit = e => {
    e.preventDefault()

    const newItem = {
      asin: this.state.asin
    }

    this.props.addItem(newItem)
    this.toggle()
  }

  /** Main render method */
  render() {
    return (
      <div>
        <Button
          color='success'
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to item list</ModalHeader>
          <ModalBody>
            <AvForm onSubmit={this.onSubmit}>
              <Label for='item'>Item</Label>
              <AvField
                name='asin'
                id='item'
                placeholder='Add ASIN Number, for example: B07HJWVJDN'
                onChange={this.onChange}
                validate={{
                  required: {
                    value: true,
                    errorMessage: 'ASIN Number is required'
                  },
                  pattern: {
                    value: '^[A-Za-z0-9]+$',
                    errorMessage:
                      'ASIN number must be composed only with letter and numbers'
                  },
                  minLength: {
                    value: 10,
                    errorMessage: 'ASIN number must be 10 characters'
                  },
                  maxLength: {
                    value: 10,
                    errorMessage: 'ASIN number must be 10 characters'
                  }
                }}
              />
              <Button
                color='success'
                style={{ marginTop: '2rem' }}
                disabled={this.state.error}
                block
              >
                Add Item
              </Button>
            </AvForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ items }) => {
  return { items }
}

/* Exports ======================================================================================= */
export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal)
