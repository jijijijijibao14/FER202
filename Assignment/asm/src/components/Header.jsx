import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <Navbar bg="light" className="mb-3">
      <Container>
        <Navbar.Brand>
          <img alt="logo" src="./images/logo.jpg" bg="secondary" width="30" height="30" className="me-2" />
          PersonalBudget
        </Navbar.Brand>
        <div>
          <span className="me-3">Signed in as: {user?.fullName}</span>
          <Button variant="outline-danger" onClick={() => { logout(); nav("/login"); }}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
