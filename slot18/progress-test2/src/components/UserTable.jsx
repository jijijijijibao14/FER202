import React, { useState } from 'react';
import { Table, Button, Badge, Image } from 'react-bootstrap';
import UserDetailModal from './UserDetailModal';
import BanAccountModal from './BanAccountModal';

const UserTable = ({ users, onUserUpdate }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleBanAccount = (user) => {
    setSelectedUser(user);
    setShowBanModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  const handleCloseBanModal = () => {
    setShowBanModal(false);
    setSelectedUser(null);
  };

  const handleBanConfirm = async (userId, newStatus) => {
    await onUserUpdate(userId, { status: newStatus });
    handleCloseBanModal();
  };

  return (
    <>
      <div style={{ minHeight: '200px' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>ID</th>
              <th style={{ width: '80px' }}>Avatar</th>
              <th>Username</th>
              <th>Full Name</th>
              <th style={{ width: '100px' }}>Role</th>
              <th style={{ width: '100px' }}>Status</th>
              <th style={{ width: '260px', minWidth: '260px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '50%'
                  }}>
                    <Image
                      src={user.avatar || '/images/default-avatar.png'}
                      alt={user.username}
                      roundedCircle
                      width="40"
                      height="40"
                      style={{ 
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                      onError={(e) => {
                        e.target.src = '/images/default-avatar.png';
                      }}
                    />
                  </div>
                </td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>
                  <Badge bg={user.role === 'admin' ? 'primary' : 'secondary'}>
                    {user.role}
                  </Badge>
                </td>
                <td>
<Badge bg={user.status === 'active' ? 'success' : 'danger'}>
                    {user.status}
                  </Badge>
                </td>
                <td>
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    flexWrap: 'nowrap',
                    alignItems: 'center'
                  }}>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => handleViewDetails(user)}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant={user.status === 'active' ? 'outline-danger' : 'outline-success'}
                      size="sm"
                      onClick={() => handleBanAccount(user)}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {user.status === 'active' ? 'Ban Account' : 'Unban Account'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center" style={{ padding: '40px' }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <UserDetailModal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        user={selectedUser}
      />

      <BanAccountModal
        show={showBanModal}
        onHide={handleCloseBanModal}
        user={selectedUser}
        onConfirm={handleBanConfirm}
      />
    </>
  );
};

export default UserTable;