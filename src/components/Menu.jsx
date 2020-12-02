import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import MenuItem from './MenuItem';

const Menu = props => {
  return (
    <Row>
      {props.menu.menuItems.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </Row>
  );
};

Menu.propTypes = {
  menu: PropTypes.object,
};

export default Menu;
