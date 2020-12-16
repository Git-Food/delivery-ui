import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  loadShoppingCart,
  incrementOrderItem,
  decrementOrderItem,
  resetShoppingCart,
} from '../store/shoppingCart';
import OrderItem from './OrderItem';

import {
  NavItem,
  Modal,
  Button,
  ButtonToolbar,
  Tooltip,
  OverlayTrigger,
  Row,
  Jumbotron,
  Container,
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
    if (this.props.user) {
      this.props.loadShoppingCart(this.props.user.uid);
    }
  }

  componentDidUpdate(prevProps) {
    // User log in (no user prevoiusly & now user exists)
    if (prevProps.user === null && this.props.user !== null) {
      this.props.loadShoppingCart(this.props.user.uid);
    }

    // User log out (user exists previousy & now no user)
    if (prevProps.user !== null && this.props.user === null) {
      this.props.resetShoppingCart();
    }
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
            {this.props.user && this.props.shoppingCart.quantity ? (
              Object.entries(this.props.shoppingCart.items).map(
                ([k, value]) => (
                  <Row key={k + '1'}>
                    <OrderItem
                      key={k}
                      orderItem={value}
                      onIncrement={this.props.incrementOrderItem}
                      onDecrement={this.props.decrementOrderItem}
                      userid={this.props.user.uid}
                    />
                  </Row>
                )
              )
            ) : (
              <Jumbotron fluid>
                <Container className="text-center">
                  <h2>No Items</h2>
                  <p>What are you waiting for? Get some food in your belly!</p>
                </Container>
              </Jumbotron>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Row key="">
              Total Price: ${this.props.shoppingCart.price.toFixed(2)}
            </Row>
            <ButtonToolbar>
              <Link to="/checkout">
                <Button
                  variant="outline-dark"
                  onClick={this.hideModal}
                  disabled={this.props.shoppingCart.empty}>
                  Checkout
                </Button>
              </Link>
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
  loadShoppingCart: userId => dispatch(loadShoppingCart(userId)),
  incrementOrderItem: (orderItem, userId) =>
    dispatch(incrementOrderItem(orderItem, userId)),
  decrementOrderItem: (orderItem, userId) =>
    dispatch(decrementOrderItem(orderItem, userId)),
  resetShoppingCart: () => dispatch(resetShoppingCart()),
});

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.object,
  loadShoppingCart: PropTypes.func,
  incrementOrderItem: PropTypes.func,
  decrementOrderItem: PropTypes.func,
  resetShoppingCart: PropTypes.func,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
