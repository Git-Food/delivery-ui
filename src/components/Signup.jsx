import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../store/AuthContext';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create account');
    }
    setLoading(false);
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center mt-4">
        <div className="w-100" style={{ maxWidth: 400 }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w100" type="submit">
              Sign Up
            </Button>
          </Form>

          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
