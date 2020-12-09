/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Button, Container, Col } from 'react-bootstrap';

const Order = props => {
  // console.log(props.restaurantName);
  const {
    orderStatus,
    totalPrice,
    totalOrderItemQuantity,
    orderDate,
  } = props.order;

  // TODO (shh) create Order Status button vs Re-Order Button depending on orderStatus
  // if OrderStatus is PENDING, UNDER_REVIEW, ACCEPTED, FOOD_BEING_PREPARED, COURIER_ON_WAY --> Order Status button
  // if OrderStatus is DELIVERED, REJECTED_BY_RESTAURANT, NO_COURIER_AVAILABLE, REFUNDED, CANCELLED --> Re-Order button

  // function handleFindRestaurant() {
  //   props.findRestaurantName(props.order.businessId);
  // }

  // const restaurantName = props.findRestaurantName(props.order.businessId);

  return (
    <Container>
      <Card className="mb-3">
        <Row>
          <Col className="center">
            <Card.Img
              src={`https://picsum.photos/id/${Math.floor(
                Math.random() * 99
              )}/200`}
              style={{ maxWidth: '200px', minWidth: '200px' }}
            />
          </Col>
          <Col className="col-md-8 col-xs-12">
            <Card.Body className="text-md-right text-xs-left">
              <Card.Title>Fetch Restaurant Name</Card.Title>
              <Card.Text>
                {`${orderDate.monthValue}/${orderDate.dayOfMonth}/${orderDate.year}`}
                <br />
                {totalOrderItemQuantity} items
                <br />
                {'$' + (totalPrice / 100).toFixed(2)}
                <br />
                {orderStatus}
                <br />
                <Button>Re-Order</Button>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

Order.propTypes = {
  order: PropTypes.object,
};

export default Order;
