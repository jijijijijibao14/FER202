import React, { useState } from 'react';
import { Card, Table, Alert, Spinner, Button } from 'react-bootstrap';
import { useExpenseContext } from '../contexts/PaymentContext';
import { formatCurrency, formatDate } from '../utils/formatter';
import ConfirmModal from './ConfirmModal';

const ExpenseList = () => {
  const {
    loading,
    error,
    getFilteredAndSortedExpenses,
    getFilteredTotal,
    deleteExpense,
  } = useExpenseContext();

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const rows = getFilteredAndSortedExpenses();
  const filteredTotal = getFilteredTotal();

  const handleEdit = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowFormModal(true);
  };

  const handleDelete = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedExpenseId) {
      await deleteExpense(selectedExpenseId);
      setShowDeleteModal(false);
      setSelectedExpenseId(null);
    }
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setSelectedExpenseId(null);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">Expense Management</Card.Header>
      <Card.Body>
        {loading && (
          <div className="mb-3">
            <Spinner animation="border" size="sm" className="me-2" />
            Loading ...
          </div>
        )}
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>             
              <th>Date</th>

            </tr>
          </thead>
          <tbody>
            {rows.map((e, idx) => (
              <tr key={e.id}>
                <td>{idx + 1}</td>
                <td>{e.name}</td>
                <td>{formatCurrency(p.amount)}</td>
                <td>{e.category}</td>
                <td>{formatDate(e.date)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(e.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
<td colSpan={6} className="text-center">
                  Not found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="text-end fw-bold">
          Total Amount: {formatCurrency(filteredTotal)}
        </div>
      </Card.Body>


      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showDeleteModal}
        title="Delete Payment"
        message="Are you sure you want to delete this payment? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onHide={() => {
          setShowDeleteModal(false);
          setSelectedExpenseId(null);
        }}
      />
    </Card>
  );
};

export default ExpenseList;