import React from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Button, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchingRestaurant: {},
    };
  }

  findMatchingRestaurant(restaurants) {
    const matchingRestaurant = restaurants.find(
      restaurant => restaurant.id === this.props.order.businessId
    );
    this.setState({ matchingRestaurant: matchingRestaurant });
  }

  componentDidMount() {
    this.findMatchingRestaurant(this.props.restaurants);
  }

  render() {
    const {
      orderStatus,
      totalPrice,
      totalOrderItemQuantity,
      orderDate,
    } = this.props.order;
    const { matchingRestaurant } = this.state;

    const isOrderCompleted =
      orderStatus ===
      ('DELIVERED' ||
        'REJECTED_BY_RESTAURANT' ||
        'NO_COURIER_AVAILABLE' ||
        'REFUNDED' ||
        'CANCELLED');

    return (
      <Container>
        <Card className="mb-3">
          <Row>
            <Col>
              <Card.Img
                src={`https://picsum.photos/id/${Math.floor(
                  Math.random() * 99
                )}/200`}
                style={{ maxWidth: '200px', minWidth: '200px' }}
              />
            </Col>
            <Col className="col-md-8 col-xs-12">
              <Card.Body className="text-md-right text-xs-left">
                <Card.Title>{matchingRestaurant.name}</Card.Title>
                <Card.Text>
                  {`${orderDate.monthValue}/${orderDate.dayOfMonth}/${orderDate.year}`}
                  <br />
                  {totalOrderItemQuantity} items
                  <br />
                  {'$' + (totalPrice / 100).toFixed(2)}
                  <br />
                  {isOrderCompleted ? (
                    <Link to={`/menu/${matchingRestaurant.menuId}`}>
                      <Button>Reorder</Button>
                    </Link>
                  ) : (
                    <Button>Order Status</Button>
                  )}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

Order.propTypes = {
  order: PropTypes.object,
  restaurants: PropTypes.array,
};

export default Order;
