import React, { useState } from 'react';
import { Card, Table, Alert, Spinner, Button } from 'react-bootstrap';
import { usePaymentContext } from '../contexts/PaymentContext';
import { formatCurrency, formatDate } from '../utils/formatter';
import PaymentFormModal from './PaymentFormModal';
import ConfirmModal from './ConfirmModal';

const PaymentTable = () => {
  const {
    loading,
    error,
    getFilteredAndSortedPayments,
    getFilteredTotal,
    deletePayment,
  } = usePaymentContext();

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const rows = getFilteredAndSortedPayments();
  const filteredTotal = getFilteredTotal();

  const handleEdit = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setShowFormModal(true);
  };

  const handleDelete = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedPaymentId) {
      await deletePayment(selectedPaymentId);
      setShowDeleteModal(false);
      setSelectedPaymentId(null);
    }
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setSelectedPaymentId(null);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">Payment History</Card.Header>
      <Card.Body>
        {loading && (
          <div className="mb-3">
            <Spinner animation="border" size="sm" className="me-2" />
            Loading payments...
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
              <th>Semester</th>
              <th>Course Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p, idx) => (
              <tr key={p.id}>
                <td>{idx + 1}</td>
                <td>{p.semester}</td>
                <td>{p.courseName}</td>
                <td>{formatCurrency(p.amount)}</td>
                <td>{formatDate(p.date)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(p.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
<td colSpan={6} className="text-center">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="text-end fw-bold">
          Total Amount: {formatCurrency(filteredTotal)}
        </div>
      </Card.Body>

      {/* Payment Form Modal */}
      <PaymentFormModal
        show={showFormModal}
        onHide={handleCloseFormModal}
        paymentId={selectedPaymentId}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showDeleteModal}
        title="Delete Payment"
        message="Are you sure you want to delete this payment? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onHide={() => {
          setShowDeleteModal(false);
          setSelectedPaymentId(null);
        }}
      />
    </Card>
  );
};

export default PaymentTable;