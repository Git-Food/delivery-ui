/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';

const Restaurant = props => {
  const { name, cuisineType, location } = props.restaurant;
  const { streetAddress, houseNumber, city, state, zipCode } = location;
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
            {cuisineType}
          </Card.Subtitle>
          <Card.Text>
            {houseNumber} {streetAddress}
            <br />
            {city}, {state} {zipCode}
          </Card.Text>
          <Button variant="primary">View Menu</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.object,
};

export default Restaurant;
