import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  loadShoppingCart,
  incrementOrderItem,
  decrementOrderItem,
} from '../store/shoppingCart';
import OrderItem from './OrderItem';
import { useAuth } from '../store/AuthContext';

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
    const { currentUser } = useAuth;
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
            {Object.entries(this.props.shoppingCart.items).map(([k, value]) => (
              <Row key={k + '1'}>
                {/* Pass props to child component, userid is harcoded for now */}
                {/* TODO: (pcg) replace harcoded user id */}
                <OrderItem
                  key={k}
                  orderItem={value}
                  onIncrement={this.props.incrementOrderItem}
                  onDecrement={this.props.decrementOrderItem}
                  // userid={currentUser.id}
                />
              </Row>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Row key="">
              Total Price: ${this.props.shoppingCart.price.toFixed(2)}
            </Row>
            <ButtonToolbar>
              <Button
                variant="outline-dark"
                onClick={this.hideModal}
                disabled={this.props.shoppingCart.empty}
                href="/checkout">
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
  shoppingCart: state.entities.shoppingCart,
});

const mapDispatchToProps = dispatch => ({
  loadShoppingCart: () => dispatch(loadShoppingCart()),
  incrementOrderItem: (orderItem, userId) =>
    dispatch(incrementOrderItem(orderItem, userId)),
  decrementOrderItem: (orderItem, userId) =>
    dispatch(decrementOrderItem(orderItem, userId)),
});

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.object,
  loadShoppingCart: PropTypes.func,
  incrementOrderItem: PropTypes.func,
  decrementOrderItem: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
