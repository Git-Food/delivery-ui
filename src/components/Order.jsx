import React from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Button, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRestaurants } from '../store/restaurants';

class Order extends React.Component {
  componentDidMount() {
    this.props.loadRestaurants();
  }

  render() {
    const {
      orderStatus,
      totalPrice,
      totalOrderItemQuantity,
      orderDate,
      businessId,
    } = this.props.order;

    const isOrderCompleted =
      orderStatus ===
      ('DELIVERED' ||
        'REJECTED_BY_RESTAURANT' ||
        'NO_COURIER_AVAILABLE' ||
        'REFUNDED' ||
        'CANCELLED');

    const matchingRestaurant = this.props.restaurants.find(
      restaurant => restaurant.id === businessId
    );

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

const mapStateToProps = state => ({
  restaurants: state.entities.restaurants.list,
});

const mapDispatchToProps = dispatch => ({
  loadRestaurants: () => dispatch(loadRestaurants()),
});

Order.propTypes = {
  order: PropTypes.object,
  restaurants: PropTypes.object,
  loadRestaurants: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
