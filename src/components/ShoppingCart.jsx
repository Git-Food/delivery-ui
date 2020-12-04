import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadShoppingCart } from '../store/shoppingCart';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';

import {
  NavItem,
  Modal,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
  Tooltip,
  OverlayTrigger,
  Row,
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
            {/* <Form name="contactAdd">
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl name="name" autoFocus />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email*</ControlLabel>
                <FormControl name="email" />
              </FormGroup>
              <FormGroup validationState={invalidFields.phone ? 'error' : null}>
                <ControlLabel>Phone Number*</ControlLabel>
                <FormControl
                componentClass={PhoneInput}
                international
                defaultCountry="US"
                name="phone"
                // value={phone}
                onChange={this.onPhoneChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup>
                <ControlLabel>LinkedIn*</ControlLabel>
                <FormControl name="LinkedIn" />
              </FormGroup>
            </Form> */}
            {Object.entries(this.props.cart.items).map(([k, value]) => (
              <Row key="">
                <OrderItem key={k} orderItem={value} />
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
});

ShoppingCart.propTypes = {
  cart: PropTypes.object,
  loadShoppingCart: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
