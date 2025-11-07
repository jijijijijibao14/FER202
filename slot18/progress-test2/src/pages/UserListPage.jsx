import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

const UserListPage = () => {
  const { user: currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    sortBy: 'id_asc',
  });

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter and sort users
  useEffect(() => {
    let filtered = [...users];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.username.toLowerCase().includes(searchLower) ||
          user.fullName.toLowerCase().includes(searchLower)
      );
    }

    // Role filter
    if (filters.role) {
      filtered = filtered.filter((user) => user.role === filters.role);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter((user) => user.status === filters.status);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'id_asc':
          return Number(a.id) - Number(b.id);
        case 'id_desc':
          return Number(b.id) - Number(a.id);
        case 'username_asc':
          return (a.username || '').localeCompare(b.username || '');
        case 'username_desc':
          return (b.username || '').localeCompare(a.username || '');
        case 'fullName_asc':
          return (a.fullName || '').localeCompare(b.fullName || '');
        case 'fullName_desc':
          return (b.fullName || '').localeCompare(a.fullName || '');
        case 'role_asc':
          return (a.role || '').localeCompare(b.role || '');
        case 'role_desc':
          return (b.role || '').localeCompare(a.role || '');
        default:
          return 0;
      }
    });

    setFilteredUsers(filtered);
  }, [users, filters]);

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Handle user update (ban/unban)
  const handleUserUpdate = async (userId, updateData) => {
setLoading(true);
    setError(null);
    try {
      const userToUpdate = users.find((u) => u.id === userId);
      if (!userToUpdate) {
        setError('User not found');
        setLoading(false);
        return;
      }

      const updatedUser = await api.updateUser(userId, {
        ...userToUpdate,
        ...updateData,
      });
      
      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? updatedUser : u))
      );
      
      // Nếu admin ban chính mình, đăng xuất và chuyển về trang login
      if (currentUser && currentUser.id === userId && updateData.status === 'locked') {
        setTimeout(() => {
          logout();
          navigate('/login');
        }, 100);
        return;
      }
    } catch (err) {
      setError('Failed to update user: ' + (err.message || 'Unknown error'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationHeader />
      <Container>
        <div className="mb-3 mt-4">
          <h2>User Management</h2>
        </div>

        <div style={{ minHeight: loading || error ? 'auto' : '0px' }} className="mb-3">
          {loading && (
            <div>
              <Spinner animation="border" size="sm" className="me-2" />
              Loading users...
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mb-0" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
        </div>

        <UserFilter filters={filters} onFilterChange={handleFilterChange} />

        <Card className="shadow-sm">
          <Card.Header as="h5">Users List</Card.Header>
          <Card.Body>
            <UserTable users={filteredUsers} onUserUpdate={handleUserUpdate} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserListPage;