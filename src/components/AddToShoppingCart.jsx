import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal, Form, Button, Row, Image, Table, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { addOrderItem, clearShoppingCart } from '../store/shoppingCart';

class AddToShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      quantity: 1,
      promptUser: false,
      specialnote: '',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findBusinessId = this.findBusinessId.bind(this);
    this.createNewOrder = this.createNewOrder.bind(this);
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
    this.setState({ promptUser: false });
    this.setState({ showing: false });
  }

  // TODO (pcg): take userid from store, is hardcoded for now
  addItem() {
    this.hideModal();
    this.props.addOrderItem(
      this.props.menuItem,
      this.state.specialnote,
      this.state.quantity,
      '5fd00ac53e79e6ef143eab21'
    );
    // clear quantity and notes
    this.setState({ quantity: 1 });
    this.setState({ specialnote: '' });
  }

  findBusinessId() {
    if (this.props.shoppingCart.empty) {
      return null;
    }
    return Object.entries(this.props.shoppingCart.items)[0][1].businessId;
  }

  handleSubmit() {
    const form = document.forms.menuItemAdd;
    this.setState({ specialnote: form.specialnote.value });
    let currentBusinessId = this.findBusinessId();
    if (
      currentBusinessId !== null &&
      currentBusinessId !== this.props.menuItem.businessId
    ) {
      this.setState({ promptUser: true });
      return;
    }
    this.addItem();
  }

  // TODO (pcg): take userid from store, is hardcoded for now
  async createNewOrder() {
    await this.props.clearShoppingCart('5fd00ac53e79e6ef143eab21');
    this.addItem();
  }

  render() {
    const { showing } = this.state;
    const { name, price } = this.props.menuItem;
    const { promptUser } = this.state;
    return (
      <>
        {promptUser ? (
          <React.Fragment>
            <Modal keyboard show={showing} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Create new order?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Your order contains items from a different restaurant.</p>
                <br />
                <p>Create a new order?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" onClick={this.createNewOrder}>
                  Create New Order
                </Button>
              </Modal.Footer>
            </Modal>
          </React.Fragment>
        ) : (
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
                  <Button variant="outline-dark" onClick={this.handleSubmit}>
                    Add to Shopping Cart
                  </Button>
                </Col>
              </Modal.Footer>
            </Modal>
          </React.Fragment>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  shoppingCart: state.entities.shoppingCart,
});

const mapDispatchToProps = dispatch => ({
  addOrderItem: (menuItem, specialnote, quantity, userId) =>
    dispatch(addOrderItem(menuItem, specialnote, quantity, userId)),
  clearShoppingCart: userId => dispatch(clearShoppingCart(userId)),
});

AddToShoppingCart.propTypes = {
  menuItem: PropTypes.object,
  shoppingCart: PropTypes.object,
  addOrderItem: PropTypes.func,
  clearShoppingCart: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToShoppingCart);
