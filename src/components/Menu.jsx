import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Jumbotron, Row } from 'react-bootstrap';

import MenuItem from './MenuItem';

const Menu = ({ match }) => {
  useEffect(() => {
    fetchMenu();
  }, []);
  const [menu, setMenu] = useState({
    menuItems: [],
  });

  // Looks up the menu based on the menu id provided in the url
  const fetchMenu = async () => {
    const data = await fetch(
      `https://git-food.herokuapp.com/menu/${match.params.id}`
    );
    const menu = await data.json();
    setMenu(menu);
  };

  // Optionally renders menuItems if it has any items, default is []
  return (
    <>
      <h2>{menu.name}</h2>
      {menu.menuItems.length ? (
        <Row>
          {menu.menuItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </Row>
      ) : (
        <Jumbotron fluid>
          <Container className="text-center">
            <h2>No menu item available</h2>
            <p>Please check another restaurant</p>
          </Container>
        </Jumbotron>
      )}
    </>
  );
};

Menu.propTypes = {
  match: PropTypes.object,
};

export default Menu;
