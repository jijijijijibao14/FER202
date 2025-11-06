import React, { useReducer } from "react";
import { Form, Button, Alert, Card, Container, Modal } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const initialState = {
  user: { username: "", password: "" },
  errors: {},
  errorMessage: "",
  showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, user: { ...state.user, [action.name]: action.value } };
    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, [action.name]: action.message } };
    case "CLEAR_ERROR":
      const { [action.name]: _, ...rest } = state.errors;
      return { ...state, errors: rest };
    case "SET_MESSAGE":
      return { ...state, errorMessage: action.message };
    case 'SHOW_MODAL':
      return { ...state, showModal: true };

    case 'HIDE_MODAL':
      return { ...state, showModal: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", name, value });
    if (value.trim() === "") {
      dispatch({
        type: "SET_ERROR",
        name,
        message: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      dispatch({ type: "CLEAR_ERROR", name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = state.user;
    if (!username || !password) {
      if (!username)
        dispatch({ type: "SET_ERROR", name: "username", message: "Username is required" });
      if (!password)
        dispatch({ type: "SET_ERROR", name: "password", message: "Password is required" });
      return;
    }

    const found = await login(username, password);
    if (found) {
    dispatch({ type: "SHOW_MODAL" });
    
    setTimeout(() => {
      navigate("/movies");
    }, 1500);
  } else {
    dispatch({ type: "SET_MESSAGE", message: "Sai tài khoản hoặc mật khẩu!" });
  }
  };

  const handleCloseModal = () => {
        dispatch({ type: 'HIDE_MODAL' });
        dispatch({ type: 'RESET' });
      };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <Card className="p-4 shadow-lg" style={{ width: "500px", borderRadius: "1rem" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Đăng nhập hệ thống</h3>

        {state.errorMessage && (
          <Alert variant="danger" className="text-center">
            {state.errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={state.user.username}
              onChange={handleChange}
              isInvalid={!!state.errors.username}
              placeholder="Nhập tên đăng nhập"
              size="lg"
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password" className="mb-4">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={state.user.password}
              onChange={handleChange}
              isInvalid={!!state.errors.password}
              placeholder="Nhập mật khẩu"
              size="lg"
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-3">
            <Button type="submit" variant="primary" size="lg" className="flex-fill fw-semibold">
              Đăng nhập
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="flex-fill"
              onClick={() => dispatch({ type: "RESET" })}
            >
              Hủy
            </Button>
          </div>
        </Form>
      </Card>
      <ConfirmModal  
      show={state.showModal} 
      title="Login Successful" 
      message={`Welcome, ${state.user.username}! You have successfully logged in!`} 
      onConfirm={handleCloseModal} />
    </Container>
  );
}

export default LoginForm;
