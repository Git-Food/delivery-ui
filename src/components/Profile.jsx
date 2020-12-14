import React, { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Modal,
  NavItem,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../store/AuthContext';

export default function Profile() {
  const [error, setError] = useState('');
  const [showing, setShowing] = useState(false);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');
    hideModal();
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  function showModal() {
    setShowing(true);
  }

  function hideModal() {
    setShowing(false);
  }

  return (
    <>
      <NavItem onClick={showModal}>
        <OverlayTrigger
          placement="left"
          delayShow={1000}
          overlay={<Tooltip id="show-profile">Profile</Tooltip>}>
          <FontAwesomeIcon icon={faUser} size="2x" />
        </OverlayTrigger>
      </NavItem>
      <Modal keyboard show={showing} onHide={hideModal}>
        <Modal.Body>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email: </strong>
              {/* {currentUser.email} */}
              <Link
                to="/update-profile"
                onClick={hideModal}
                className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
              <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}
