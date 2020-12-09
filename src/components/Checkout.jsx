import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Form, FormGroup, Button, Col, Card } from 'react-bootstrap';
import { loadShoppingCart } from '../store/shoppingCart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

class Checkout extends Component {
  componentDidMount() {
    this.props.loadShoppingCart();
  }

  render() {
    return (
      <>
        <h1>Checkout</h1>
        <br />
        <Table responsive>
          <thead>
            <tr>
              <th>
                <h3>Delivery Details</h3>
              </th>
              <th>
                <h3>Order Details</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {/* TODO (pcg) remove extra "space" to the right of the form */}
                <Form name="deliveryAddress">
                  <FormGroup>
                    <Form.Row>
                      <Col xs={8}>
                        <Form.Control
                          id="street"
                          type="text"
                          placeholder="Street Address"></Form.Control>
                      </Col>
                    </Form.Row>
                  </FormGroup>
                  <FormGroup>
                    <Form.Row>
                      <Col xs={4}>
                        <Form.Control
                          id="number"
                          type="text"
                          placeholder="Apt, suite or floor"></Form.Control>
                      </Col>
                      <Col xs={4}>
                        <Form.Control
                          id="businessName"
                          type="text"
                          placeholder="Business name"></Form.Control>
                      </Col>
                    </Form.Row>
                  </FormGroup>
                  <FormGroup>
                    <Form.Row>
                      <Col xs={8}>
                        <Form.Control
                          id="instructions"
                          type="text"
                          placeholder="Add delivery instructions"></Form.Control>
                      </Col>
                    </Form.Row>
                  </FormGroup>
                </Form>
              </td>
              <td>
                <Card>
                  <Card.Body>
                    {/* TODO (pcg) automate values to reflect fees, tax */}
                    Subtotal:{` $ ${this.props.shoppingCart.price.toFixed(2)}`}
                    <br />
                    Delivery fee: $ 0.00
                    <br />
                    Service fee: $ 0.00
                    <br />
                    Tip: $ 0.00
                    <br />
                    Taxes: $ 0.00
                    <br />
                    Total:{` $ ${this.props.shoppingCart.price.toFixed(2)}`}
                  </Card.Body>
                </Card>
                <br />
                <Button
                  variant="success"
                  disabled={this.props.shoppingCart.empty}>
                  Place Order
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <h3>Payment</h3>
        <FontAwesomeIcon icon={faCreditCard} size="2x" />
        {'    '}
        <FontAwesomeIcon icon={faMoneyBillWave} size="2x" />
        {'    '}
        <FontAwesomeIcon icon={faMoneyCheck} size="2x" />
        <br />
        <br />
        <Form name="paymentInfo">
          <FormGroup>
            <Form.Row>
              <Col xs={4}>
                <Form.Control
                  id="cardNumber"
                  type="text"
                  placeholder="Card Number"></Form.Control>
              </Col>
              <Col xs={1}>
                <Form.Control
                  id="cvv"
                  type="text"
                  placeholder="CVV"></Form.Control>
              </Col>
              <Col xs={2}>
                <Form.Control
                  id="expiration"
                  type="text"
                  placeholder="expiration mm/yy"></Form.Control>
              </Col>
            </Form.Row>
          </FormGroup>
        </Form>
        <br />
        <h3>Show your support with a tip</h3>
        {/* TODO (pcg) limit to one option checked */}
        <Form name="tipPercentage">
          <div key={`custom-inline-checkbox`} className="mb-3">
            <Form.Check
              custom
              inline
              label="15%"
              type="checkbox"
              id="fifthteen"
              value="15"
            />
            <Form.Check
              custom
              inline
              label="18%"
              type="checkbox"
              id="eighteen"
              value="18"
            />
            <Form.Check
              custom
              inline
              label="20%"
              type="checkbox"
              id="twenty"
              value="20"
            />
          </div>
        </Form>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadShoppingCart: () => dispatch(loadShoppingCart()),
});

const mapStateToProps = state => ({
  shoppingCart: state.entities.shoppingCart,
});

Checkout.propTypes = {
  shoppingCart: PropTypes.object,
  loadShoppingCart: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
