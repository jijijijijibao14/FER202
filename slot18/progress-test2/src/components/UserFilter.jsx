import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const UserFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="mb-4 p-3 bg-light rounded" style={{ minHeight: '120px' }}>
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by username, full name..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={filters.role}
              onChange={(e) => onFilterChange('role', e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              value={filters.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
            >
              <option value="id_asc">ID (1-9)</option>
              <option value="id_desc">ID (9-1)</option>
              <option value="username_asc">Username (A-Z)</option>
              <option value="username_desc">Username (Z-A)</option>
              <option value="fullName_asc">Full Name (A-Z)</option>
              <option value="fullName_desc">Full Name (Z-A)</option>
              <option value="role_asc">Role (A-Z)</option>
              <option value="role_desc">Role (Z-A)</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default UserFilter;