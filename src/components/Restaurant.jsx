/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Button } from 'react-bootstrap';

// import { useHistory } from 'react-router-dom';

/* TODO: (shh): determine how to best redirect to new Menu View
   After hitting the View Menu button.
   1) Pass current menu as props somehow?
   2) Use redux for accessing state?
 */
// const ViewMenuButton = props => {
//   const { menu } = props;
//   let history = useHistory();

//   function handleClick() {
//     history.push(`/restaurants/${menu.id}`);
//   }

//   return (
//     <Button variant="primary" onClick={handleClick}>
//       View Menu
//     </Button>
//   );
// };

const Restaurant = props => {
  const { name, cuisineType, location, menuId } = props.restaurant;
  const { streetAddress, houseNumber, city, state, zipCode } = location;
  return (
    <div>
      <Link to={`/menu/${menuId}`}>
        <Card className="m-3" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`https://picsum.photos/id/163/200`} />
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
      </Link>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.object,
};

export default Restaurant;
