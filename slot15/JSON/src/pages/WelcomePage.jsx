import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import LoginForm from "../components/LoginForm";


const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `url("/images/bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
        position: "relative",
    }}
    >
      <Card className="text-center p-4 shadow-lg" style={{ maxWidth: "500px" }}>
        <h1 className="mb-3">🎬 Chào mừng đến với Movie Manager</h1>
        <p className="text-muted mb-4">
          Quản lý danh sách phim yêu thích của bạn dễ dàng và nhanh chóng.
        </p>
        <Button variant="primary" onClick={() => setShowLogin(true)}>
          Đăng nhập
        </Button>
      </Card>

      {showLogin && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >
          <Card className="p-4 shadow-lg" style={{ width: "500px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0"></h4>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setShowLogin(false)}
              >
                ✖
              </Button>
            </div>
            <LoginForm />
          </Card>
        </div>
      )}
    </Container>
  );
};

export default WelcomePage;
