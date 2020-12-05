import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadShoppingCart, incrementOrderItem } from '../store/shoppingCart';
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
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleIncrease = this.handleIncrease.bind(this);
  }

  componentDidMount() {
    this.props.loadShoppingCart();
  }

  // handleIncrease(item, user) {
  //   this.props.incrementOrderItem(item, user);
  // }

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
                <OrderItem key={k} orderItem={value} />
                <Button variant="link">
                  <FontAwesomeIcon icon={faMinusCircle} size="1x" />
                </Button>
                {value.quantity}
                <Button
                  variant="link"
                  onClick={() =>
                    this.props.incrementOrderItem(
                      value,
                      '5fca9e4d7c59140783201529'
                    )
                  }>
                  <FontAwesomeIcon icon={faPlusCircle} size="1x" />
                </Button>
              </Row>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}>
                Checkout
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>
                Cancel
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
});

ShoppingCart.propTypes = {
  cart: PropTypes.object,
  loadShoppingCart: PropTypes.func,
  incrementOrderItem: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
