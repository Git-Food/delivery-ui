import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Jumbotron,
  Modal,
  NavItem,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../store/AuthContext';

export default function UpdateProfile() {
  const { currentUser, logout } = useAuth();

  const [error, setError] = useState('');
  const [showing, setShowing] = useState(false);
  const history = useHistory();

  async function handleLogout() {
    setError('');
    setShowing(false);
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <>
      <NavItem onClick={() => setShowing(true)}>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="profile">Profile</Tooltip>}>
          <FontAwesomeIcon icon={faUser} size="2x" />
        </OverlayTrigger>
      </NavItem>
      {currentUser ? (
        <Modal keyboard show={showing} onHide={() => setShowing(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="w-200 text-center mt-2">
            <strong>Email: {currentUser.email}</strong>
          </div>
          <div className="w-100" style={{ maxWidth: 400 }}>
            <Link to="/update-profile" onClick={() => setShowing(false)}>
              <div className="text-center mt-4 mb-4">Update Profile</div>
            </Link>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="w-100 text-center mt-2 mb-2">
              <Button variant="primary" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal keyboard show={showing} onHide={() => setShowing(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Not logged in</Modal.Title>
          </Modal.Header>
          <Jumbotron fluid>
            <Container className="text-center">
              <div className="w-100 text-center mt-2">
                Already have an account?{' '}
                <Link to="/login" onClick={() => setShowing(false)}>
                  Log In
                </Link>
                <div className="w-100 text-center mt-2">
                  Need an account?{' '}
                  <Link to="/signup" onClick={() => setShowing(false)}>
                    Sign Up
                  </Link>
                </div>
              </div>
            </Container>
          </Jumbotron>
        </Modal>
      )}
    </>
  );
}
