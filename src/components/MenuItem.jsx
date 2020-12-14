/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import AddToShoppingCart from './AddToShoppingCart.jsx';

import { Card } from 'react-bootstrap';

const MenuItem = props => {
  const { name, description, price } = props.item;
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          variant="top"
          src={`https://picsum.photos/id/${Math.floor(Math.random() * 99)}/200`}
        />
        <Card.Body>
          <Card.Title>
            {name} - {'$' + (price / 100).toFixed(2)}
          </Card.Title>
          <Card.Title> </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {description}
          </Card.Subtitle>
          <Card.Text>{name.note}</Card.Text>
          <AddToShoppingCart
            id="addToCart"
            menuItem={props.item}
            restaurantName={props.restaurantName}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  restaurantName: PropTypes.string,
};

export default MenuItem;
