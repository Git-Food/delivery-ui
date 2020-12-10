import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal, Form, Button, Row, Image, Table, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { addOrderItem } from '../store/shoppingCart';

class AddToShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      quantity: 1,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {}

  increaseQuantity() {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
  }

  decreaseQuantity() {
    const { quantity } = this.state;
    this.setState({ quantity: quantity > 1 ? quantity - 1 : 1 });
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  // TODO (pcg): take userid from store, is hardcoded for now
  addItem() {
    this.hideModal();
    const form = document.forms.menuItemAdd;
    this.props.addOrderItem(
      this.props.menuItem,
      form.specialnote.value,
      this.state.quantity,
      '5fd00ac53e79e6ef143eab21'
    );
    this.setState({ quantity: 1 });
  }

  render() {
    const { showing } = this.state;
    const { name, price } = this.props.menuItem;
    return (
      <React.Fragment>
        <Button onClick={this.showModal}>Add to shopping cart</Button>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Row>
              <Image
                src={`https://picsum.photos/id/${Math.floor(
                  Math.random() * 99
                )}/600/200`}
                fluid
              />
            </Row>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <tbody>
                <tr>
                  <td>Name: {name}</td>
                  <td>Price: {'$' + (price / 100).toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
            <Form name="menuItemAdd">
              <Form.Group controlId="specialnote">
                <Form.Label>Notes:</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Col>
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Button variant="link" onClick={this.decreaseQuantity}>
                    <FontAwesomeIcon icon={faMinusCircle} size="1x" />
                  </Button>
                </Col>
                <Col xs="auto">
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="quantity"
                    htmlSize={1}
                    value={this.state.quantity}
                    readOnly
                  />
                </Col>
                <Col>
                  <Button variant="link" onClick={this.increaseQuantity}>
                    <FontAwesomeIcon icon={faPlusCircle} size="1x" />
                  </Button>
                </Col>
              </Form.Row>
            </Col>
            <Col>
              <Button variant="outline-dark" onClick={this.addItem}>
                Add to Shopping Cart
              </Button>
            </Col>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  shoppingCart: state.entities.shoppingCart,
});

const mapDispatchToProps = dispatch => ({
  addOrderItem: (menuItem, note, quantity, userId) =>
    dispatch(addOrderItem(menuItem, note, quantity, userId)),
});

AddToShoppingCart.propTypes = {
  menuItem: PropTypes.object,
  shoppingCart: PropTypes.object,
  addOrderItem: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToShoppingCart);
