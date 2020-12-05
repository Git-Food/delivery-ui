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

  const fetchMenu = async () => {
    const data = await fetch(
      `https://git-food.herokuapp.com/menu/${match.params.id}`
    );
    const menu = await data.json();
    setMenu(menu);
  };

  return (
    <>
      <h1>Menu Placeholder</h1>
      <Row>
        {menu.menuItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </Row>
    </>
  );
};

Menu.propTypes = {
  match: PropTypes.object,
};

export default Menu;
