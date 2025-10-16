import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row,Col, Modal, Toast, ToastContainer,Alert} from "react-bootstrap";

function RegisterForm() {
  const [user, setUser] = useState({username: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const noErrors = Object.values(errors).every((e) => e === "");
    const allFilled = Object.values(user).every((v) => v.trim() !== "");
    setIsFormValid(noErrors && allFilled);
  }, [user, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));

    let error = "";
    switch (name) {
      case "username":
        if (!/^[A-Za-z0-9_.]{3,}$/.test(value.trim()))
          error = "Username ≥ 3 ký tự, chỉ chữ, số, _ hoặc .";
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          error = "Email không hợp lệ!";
        break;

      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)
        )
          error =
            "Password ≥ 8 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt!";
        break;

      case "confirm":
        if (value !== user.password) error = "Confirm password không khớp!";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setUser({ username: "", email: "", password: "", confirm: "" });
    setErrors({});
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Header>
              <h3 className="text-center text-primary">Register Form</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={user.confirm}
                    onChange={handleChange}
                    isInvalid={!!errors.confirm}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    className="flex-fill"
                    disabled={!isFormValid}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    className="flex-fill"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer position="top-center" className="p-3 position-fixed">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          autohide
          bg="success"
          
        >
          <Toast.Body className="text-white">
                 Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Password:</strong> {user.password}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegisterForm;
