/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import AddToShoppingCart from './AddToShoppingCart.jsx';

import { Card, Button } from 'react-bootstrap';

const MenuItem = props => {
  const { name, description } = props.item;
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          variant="top"
          src={`https://picsum.photos/id/${Math.floor(Math.random() * 99)}/200`}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {description}
          </Card.Subtitle>
          <Card.Text>{name.note}</Card.Text>
          <AddToShoppingCart id="addToCart" menuItem={props.item} />
        </Card.Body>
      </Card>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
};

export default MenuItem;
