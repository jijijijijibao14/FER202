import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import ConfirmModal from './confirmModal';

const initialState = { user: { username: '', password: '' }, errors: {}, showModal: false,};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        user: { ...state.user, [action.name]: action.value },
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.name]: action.message },
      };

    case 'CLEAR_ERROR':
      const { [action.name]: removed, ...rest } = state.errors;
      return { ...state, errors: rest };

    case 'SHOW_MODAL':
      return { ...state, showModal: true };

    case 'HIDE_MODAL':
      return { ...state, showModal: false };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', name, value });

    if (value.trim() === '') {
      dispatch({
        type: 'SET_ERROR',
        name,
        message: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      dispatch({ type: 'CLEAR_ERROR', name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (state.user.username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (state.user.password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      for (const key in newErrors) {
        dispatch({ type: 'SET_ERROR', name: key, message: newErrors[key] });
      }
    } else {
      dispatch({ type: 'SHOW_MODAL' });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: 'HIDE_MODAL' });
    dispatch({ type: 'RESET' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login Form </h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={state.user.username}
                    onChange={handleChange}
                    isInvalid={!!state.errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.user.password}
                    onChange={handleChange}
                    isInvalid={!!state.errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" className="flex-fill">    
                  Login
                </Button>
                <Button variant="secondary" type="button" className='flex-fill' onClick={() => dispatch({ type: 'RESET' })}>
                    Cancel
                  </Button>
              </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal  
      show={state.showModal} 
      title="Login Successful" 
      message={`Welcome, ${state.user.username}! You have successfully logged in!`} 
      onConfirm={handleCloseModal} />
    </Container>
  );
}

export default LoginForm;
