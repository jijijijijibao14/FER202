import React, { useReducer } from "react";
import { Form,Button, Card, Container, Row, Col, Modal, Toast, ToastContainer} from "react-bootstrap";

const initialState = {
  user: {username: "", email: "", password: "", confirmPassword: ""},errors: {},isValid: false,showToast: false,showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "change_user": {
      const { name, value } = action.payload;
      const user = { ...state.user, [name]: value };
      const errors = validate(user);
      const isValid = Object.keys(errors).length === 0;
      return { ...state, user, errors, isValid };
    }

    case "RESET_FORM":
      return initialState;

    case "SHOW_TOAST":
      return { ...state, showToast: true };

    case "HIDE_TOAST":
      return { ...state, showToast: false };

    case "SHOW_MODAL":
      return { ...state, showModal: true };

    case "HIDE_MODAL":
      return { ...state, showModal: false };

    default:
      return state;
  }
}

function validate(user) {
  const errors = {};

  if (!/^[A-Za-z0-9_.]{3,}$/.test(user.username.trim())) {
    errors.username =
      "Username must be at least 3 characters (letters, numbers, _ or .)";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim())) {
    errors.email = "Invalid email format";
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
      user.password.trim()
    )
  ) {
    errors.password =
      "Password must be ≥8 chars, include upper, lower, number, special char";
  }

  if (user.confirmPassword !== user.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "change_user", payload: { name, value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.isValid) {
      dispatch({ type: "SHOW_TOAST" });
      dispatch({ type: "SHOW_MODAL" });
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const handleCloseModal = () => {
    dispatch({ type: "HIDE_MODAL" });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Register Form</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
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

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={state.user.email}
                    onChange={handleChange}
                    isInvalid={!!state.errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
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

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={state.user.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!state.errors.confirmPassword}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleReset}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!state.isValid}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer position="top-center" className="p-3 position-fixed">
        <Toast
          onClose={() => dispatch({ type: "HIDE_TOAST" })}
          show={state.showToast}
          delay={2000}
          autohide
          bg="success"
        >
          <Toast.Body className="text-white text-center">
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={state.showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p>
                <strong>Username:</strong> {state.user.username}
              </p>
              <p>
                <strong>Email:</strong> {state.user.email}
              </p>
              <p>
                <strong>Password:</strong> {state.user.password.replace(
                  /./g,
                  "*"
                )}
              </p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegisterForm;
