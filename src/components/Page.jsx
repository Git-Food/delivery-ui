import React from 'react';
import {
  Container,
  Navbar,
  Nav,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import ShoppingCart from './ShoppingCart.jsx';
import Contents from './Contents.jsx';
import { useAuth } from '../store/AuthContext';

const NavBar = () => {
  const { currentUser } = useAuth();
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
          <ShoppingCart user={currentUser} />
        </Nav>
        <Nav className="ml-5">
          <Link to="/profile">
            <Profile />
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const Profile = () => {
  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id="profile">Profile</Tooltip>}>
      <FontAwesomeIcon icon={faUser} style={{ color: 'black' }} size="2x" />
    </OverlayTrigger>
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
