/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';

function ViewMenuButton(props) {
  console.log(props);
  let history = useHistory();

  function handleClick() {
    history.push(`/restaruants/${props.id}`);
  }

  return (
    <Button variant="primary" onClick={handleClick}>
      View Menu
    </Button>
  );
}

const Restaurant = props => {
  const { name, cuisineType, location, menu } = props.restaurant;
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
          {/* <Button variant="primary">View Menu</Button> */}
          <ViewMenuButton menu={menu}></ViewMenuButton>
        </Card.Body>
      </Card>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.object,
};

export default Restaurant;
