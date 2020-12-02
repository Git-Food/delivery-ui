import React from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// import Contents from './Contents.jsx';
import Menus from './Menus';
import DeliveriesList from './DeliveriesList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Git-Food</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer exact to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/orders">
            <Nav.Link>Orders</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/favorites">
            <Nav.Link>Favorites</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
        <Nav pullRight>
          {/* TODO (shh): Create ShoppingCart Modal NOT Route */}
          <LinkContainer exact to="/shoppingcart">
            <Nav.Link>
              {<FontAwesomeIcon icon={faShoppingCart} size="2x" />}
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const Footer = () => {
  return (
    <small>
      <hr />
      <p className="text-center">
        Full source code available at this{' '}
        <a href="https://github.com/Git-Food">GitHub repository</a>
      </p>
    </small>
  );
};

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container fluid>
          {/* TODO (shh): Create Contents component */}
          {/* <Contents /> */}
          {/* (shh): DeliveriesList and Menus used for time being */}
          <DeliveriesList />
          <Menus />
        </Container>
        <Footer />
      </div>
    );
  }
}
