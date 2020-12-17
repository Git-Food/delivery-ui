import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal, Form, Button, Row, Image, Table, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { addOrderItem, clearShoppingCart } from '../store/shoppingCart';
import AuthContext from '../store/AuthContext';
import { Redirect } from 'react-router-dom';

class AddToShoppingCart extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      quantity: 1,
      promptUser: false,
      specialnote: '',
      redirect: false,
    };
    this.showModalOrLogIn = this.showModalOrLogIn.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findBusinessId = this.findBusinessId.bind(this);
    this.createNewOrder = this.createNewOrder.bind(this);
    this.onSpecialNoteChange = this.onSpecialNoteChange.bind(this);
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

  showModalOrLogIn() {
    const user = this.context.currentUser;
    user ? this.setState({ showing: true }) : this.setState({ redirect: true });
  }

  hideModal() {
    this.setState({ showing: false });
    this.setState({ promptUser: false });
  }

  addItem() {
    const user = this.context.currentUser;
    this.hideModal();
    this.props.addOrderItem(
      this.props.menuItem,
      this.state.specialnote,
      this.state.quantity,
      user.uid
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

  onSpecialNoteChange(event) {
    this.setState({ specialnote: event.target.value });
  }

  handleSubmit() {
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
    const user = this.context.currentUser;
    await this.props.clearShoppingCart(user.uid);
    this.addItem();
  }

  render() {
    const { showing } = this.state;
    const { name, price } = this.props.menuItem;
    const { promptUser } = this.state;
    const restaurantName = this.props.restaurantName;

    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        {promptUser ? (
          <React.Fragment>
            <Button onClick={this.showModalOrLogIn}>
              Add to shopping cart
            </Button>
            <Modal keyboard show={showing} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Start new cart?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Your cart already contains items from a different restaurant.
                  Would you like to clear the cart and add this item from
                  {restaurantName} instead?
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.hideModal}>
                  Cancel
                </Button>
                <Button variant="outline-dark" onClick={this.createNewOrder}>
                  Create New Order
                </Button>
              </Modal.Footer>
            </Modal>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button onClick={this.showModalOrLogIn}>
              Add to shopping cart
            </Button>
            <Modal keyboard show={showing} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Row>
                  <Image src={`https://picsum.photos/id/488/600/200`} fluid />
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
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={this.onSpecialNoteChange}
                    />
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
  restaurantName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToShoppingCart);
