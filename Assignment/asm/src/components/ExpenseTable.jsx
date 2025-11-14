import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useExpenses } from "../contexts/ExpenseContext";
import { formatVND, formatDateDDMMYYYY } from "../utils/format";

export default function ExpenseTable({ list, onEdit }) {
  const { deleteExpense } = useExpenses();

  // State cho modal delete
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Khi nhấn Delete → mở modal
  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  // Xác nhận xóa
  const handleConfirmDelete = async () => {
    await deleteExpense(selectedExpense.id);
    setShowModal(false);
    setSelectedExpense(null);
  };

  return (
    <>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th style={{ width: 140 }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{formatVND(e.amount)}</td>
              <td>{e.category}</td>
              <td>{formatDateDDMMYYYY(e.date)}</td>
              <td>
                <Button
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(e)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDeleteClick(e)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ============================== */}
      {/*   Modal Xác Nhận Xóa Expense   */}
      {/* ============================== */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedExpense?.name}</strong>?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
