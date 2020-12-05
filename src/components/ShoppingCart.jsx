import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  loadShoppingCart,
  incrementOrderItem,
  decrementOrderItem,
} from '../store/shoppingCart';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';

import {
  NavItem,
  Modal,
  Button,
  ButtonToolbar,
  Tooltip,
  OverlayTrigger,
  Row,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadShoppingCart();
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    // TODO (pcg): redirect to checkout
  }

  render() {
    const { showing } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="show-cart">Shopping Cart</Tooltip>}>
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Object.entries(this.props.cart.items).map(([k, value]) => (
              <Row key="">
                {/* Pass props to child component, userid is harcoded for now */}
                <OrderItem
                  key={k}
                  orderItem={value}
                  onIncrement={this.props.incrementOrderItem}
                  onDecrement={this.props.decrementOrderItem}
                  userid={'5fca9e4d7c59140783201529'}
                />
              </Row>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button variant="outline-dark" onClick={this.handleSubmit}>
                Checkout
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.entities.cart,
});

const mapDispatchToProps = dispatch => ({
  loadShoppingCart: () => dispatch(loadShoppingCart()),
  incrementOrderItem: (orderItem, userId) =>
    dispatch(incrementOrderItem(orderItem, userId)),
  decrementOrderItem: (orderItem, userId) =>
    dispatch(decrementOrderItem(orderItem, userId)),
});

ShoppingCart.propTypes = {
  cart: PropTypes.object,
  loadShoppingCart: PropTypes.func,
  incrementOrderItem: PropTypes.func,
  decrementOrderItem: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
