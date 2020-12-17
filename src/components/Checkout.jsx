import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form, FormGroup, Button, Col, Card } from 'react-bootstrap';
import { loadShoppingCart, checkout } from '../store/shoppingCart';
import { useAuth } from '../store/AuthContext';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

export default function Checkout() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.entities.shoppingCart);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadShoppingCart(currentUser.uid));
  }, []);

  async function placeOrder() {
    await dispatch(checkout(currentUser.uid));
    history.push('/orders');
  }

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
                  Subtotal:{` $ ${shoppingCart.price.toFixed(2)}`}
                  <br />
                  Delivery fee: $ 0.00
                  <br />
                  Service fee: $ 0.00
                  <br />
                  Tip: $ 0.00
                  <br />
                  Taxes: $ 0.00
                  <br />
                  Total:{` $ ${shoppingCart.price.toFixed(2)}`}
                </Card.Body>
              </Card>
              <br />
              <Button
                variant="success"
                disabled={shoppingCart.empty}
                // TODO (pcg): replace user id
                onClick={placeOrder}>
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
      <Form>
        <FormGroup controlId="tip">
          <Form.Check inline label="15%" type="checkbox" value="15" />
          <Form.Check inline label="18%" type="checkbox" value="18" />
          <Form.Check inline label="20%" type="checkbox" value="20" />
        </FormGroup>
      </Form>
    </>
  );
}

Checkout.propTypes = {
  shoppingCart: PropTypes.object,
  loadShoppingCart: PropTypes.func,
  checkout: PropTypes.func,
};
