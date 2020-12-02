import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import MenuItem from './MenuItem';

const Menu = props => {
  return (
    <Container fluid>
      <Row>
        {props.menu.menuItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </Row>
    </Container>
  );
};

Menu.propTypes = {
  menu: PropTypes.object,
};

export default Menu;
