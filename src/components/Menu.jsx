import React from 'react';

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

export default Menu;
