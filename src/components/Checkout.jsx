import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Form, FormGroup, Button, Col, Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <h1>Checkout</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Delivery Details</th>
              <th>Order Details</th>
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
                          htmlSize={6}
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
                          htmlSize={6}
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
                    Subtotal: {}
                    {'$ ' + this.props.shoppingCart.price.toFixed(2)}
                    <br />
                    Delivery fee: $ 0.00
                    <br />
                    Service fee: $ 0.00
                    <br />
                    Tip: $ 0.00
                    <br />
                    Taxes: $ 0.00
                    <br />
                    Total: {}
                    {'$ ' + (this.props.shoppingCart.price / 100).toFixed(2)}
                  </Card.Body>
                </Card>
                <br />
                <Button variant="success">Place Order</Button>
              </td>
            </tr>
            <tr>
              <td>
                <th>Payment</th>
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
                <th>Show your support with a tip</th>
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
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

const mapStateToProps = state => ({
  shoppingCart: state.entities.shoppingCart,
});

Checkout.propTypes = {
  shoppingCart: PropTypes.object,
};

export default connect(mapStateToProps, null)(Checkout);
