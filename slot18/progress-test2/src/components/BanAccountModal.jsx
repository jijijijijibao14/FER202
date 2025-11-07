import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BanAccountModal = ({ show, onHide, user, onConfirm }) => {
  if (!user) return null;

  const isActive = user.status === 'active';
  const newStatus = isActive ? 'locked' : 'active';
  const actionText = isActive ? 'Ban' : 'Unban';

  const handleConfirm = () => {
    onConfirm(user.id, newStatus);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{actionText} Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to <strong>{actionText.toLowerCase()}</strong> the account of{' '}
          <strong>{user.fullName}</strong> ({user.username})?
        </p>
        {isActive ? (
          <p className="text-danger">
            This will lock the account and prevent the user from logging in.
          </p>
        ) : (
          <p className="text-success">
            This will unlock the account and allow the user to log in again.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant={isActive ? 'danger' : 'success'} onClick={handleConfirm}>
          {actionText} Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BanAccountModal;