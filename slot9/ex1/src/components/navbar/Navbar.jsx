import { Nav, Navbar, Form, FormControl, Button, Dropdown, Container, Modal, ProgressBar, Row, Col } from "react-bootstrap";
import { FaUser, FaSignInAlt, FaHeart } from "react-icons/fa";
import { useState } from "react";
import "./navbar.css";


export default function NavBar() {
  const [showAccounts, setShowAccounts] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);

  const handleShowAccounts = () => setShowAccounts(true);
  const handleCloseAccounts = () => {
    setShowAccounts(false);
    setStep(1);
    setProgress(33);
  };

  const goToStep = (n) => {
    setStep(n);
    setProgress(33 * n);
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      setProgress(progress + 33);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(progress - 33);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Container fluid>
        <Nav className="me-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <Nav.Link href="#">Contact</Nav.Link>
        </Nav>

        <Form className="d-flex me-3">
          <FormControl
            type="search"
            placeholder="Quick Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="success">Search</Button>
        </Form>

        <Dropdown className="me-3" align="end">
          <Dropdown.Toggle>
            <FaUser /> Accounts
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item>
              <Button>Manage Your Profile</Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Button onClick={handleShowAccounts}>Build Your Profile</Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Button>Change Password</Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Modal show={showAccounts} onHide={handleCloseAccounts} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title className="bi bi-person-circle"> Build Your Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ProgressBar now={progress} label={`${Math.min(progress, 100)}%`} className="mb-3" />
            <Nav 
              variant="tabs" 
              activeKey={step} 
              className="mb-3 d-flex"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey={1}
                  active={step === 1}
                  onClick={() => goToStep(1)}
                >
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey={2}
                  active={step === 2}
                  onClick={() => goToStep(2)}
                >
                  Account
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey={3}
                  active={step === 3}
                  onClick={() => goToStep(3)}
                >
                  Address
                </Nav.Link>
              </Nav.Item>
            </Nav>

            {step === 1 && (
              <>
                <i className="mb-3 bi bi-person-circle"> About Information</i>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control placeholder="Enter your first name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control placeholder="Enter your last name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control type="text" placeholder="Enter your phone number" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Age *</Form.Label>
                  <Form.Control type="number" placeholder="Enter your age" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </>
            )}

            {step === 2 && (
              <>
                <h5 className="mb-3 bi bi-lock"> Account Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Username *</Form.Label>
                  <Form.Control placeholder="Enter your username" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password *</Form.Label>
                  <Form.Control type="password" placeholder="Confirm password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Secret Question *</Form.Label>
                  <Form.Select>
                    <option>What is your first pet's name?</option>
                    <option>What is your mother's maiden name?</option>
                    <option>What city were you born in?</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Answer *</Form.Label>
                  <Form.Control placeholder="Enter your answer" />
                </Form.Group>
              </>
            )}

            {step === 3 && (
              <>
                <h5 className="mb-3 bi bi-geo-alt"> Address Information</h5>
                <div className="d-flex flex-column gap-3">
                  <Form.Group>
                    <Form.Label>Street *</Form.Label>
                    <Form.Control placeholder="Enter your street address" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>City *</Form.Label>
                    <Form.Control placeholder="Enter your city" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>State *</Form.Label>
                    <Form.Control placeholder="Enter your state/province" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Zip Code *</Form.Label>
                    <Form.Control placeholder="Enter your zip code" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Country *</Form.Label>
                    <Form.Select>
                      <option>Select a country</option>
                      <option>Vietnam</option>
                      <option>United States</option>
                      <option>Japan</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </>
            )}
          </Modal.Body>

          <Modal.Footer>
            {step > 1 && (
              <Button variant="secondary" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button variant="primary" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button variant="success" onClick={handleCloseAccounts}>
                Finish
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        <Button variant="primary" className="me-3">
          <FaSignInAlt /> Login
        </Button>
        <Button variant="primary" className="me-3">
          <FaHeart /> My Favourites
        </Button>
      </Container>
    </Navbar>
  );
}
