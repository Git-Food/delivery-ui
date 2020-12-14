import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ShoppingCart from './ShoppingCart.jsx';
import Profile from './Profile';

import Contents from './Contents.jsx';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand>Git-Food</Navbar.Brand>
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
        <Nav className="ml-auto">
          <ShoppingCart />
        </Nav>
        <Nav className="ml-5">
          <Profile />
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
          <Contents />
        </Container>
        <Footer />
      </div>
    );
  }
}
