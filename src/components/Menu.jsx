import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-bootstrap';

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
  const menuComponent =
    menu.menuItems.length > 0 ? (
      <>
        <h2>{menu.name}</h2>
        <Row>
          {menu.menuItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </Row>
      </>
    ) : (
      <Row>
        <h2>No menu available for restaurant</h2>
      </Row>
    );

  return menuComponent;
};

Menu.propTypes = {
  match: PropTypes.object,
};

export default Menu;
