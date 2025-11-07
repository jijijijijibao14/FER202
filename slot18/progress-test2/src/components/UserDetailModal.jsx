import React from 'react';
import { Modal, Image, Badge, Button } from 'react-bootstrap';

const UserDetailModal = ({ show, onHide, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <Image
            src={user.avatar || '/picture/default-avatar.jpg'}
            alt={user.username}
            width="250"
            height="250"
            style={{ 
              objectFit: 'cover',
              width: '250px',
              height: '250px',
              minWidth: '250px',
              minHeight: '250px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onError={(e) => {
              e.target.src = '/picture/default-avatar.jpg';
            }}
          />
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">ID:</div>
          <div className="col-8">{user.id}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Username:</div>
          <div className="col-8">{user.username}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Full Name:</div>
          <div className="col-8">{user.fullName}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Role:</div>
          <div className="col-8">
            <Badge bg={user.role === 'admin' ? 'primary' : 'secondary'}>
              {user.role}
            </Badge>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold">Status:</div>
          <div className="col-8">
            <Badge bg={user.status === 'active' ? 'success' : 'danger'}>
              {user.status}
            </Badge>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailModal;