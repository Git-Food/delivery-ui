import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';

const Menu = props => {
  return (
    <>
      {props.menu.menuItems.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </>
  );
};

Menu.propTypes = {
  menu: PropTypes.object,
};

export default Menu;
