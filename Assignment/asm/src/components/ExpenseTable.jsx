import React from "react";
import { Table, Button } from "react-bootstrap";
import { useExpenses } from "../contexts/ExpenseContext";
import { formatVND, formatDateDDMMYYYY } from "../utils/format";

export default function ExpenseTable({ list, onEdit }) {
  const { deleteExpense } = useExpenses();

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Name</th><th>Amount</th><th>Category</th><th>Date</th><th>Actions</th>
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
              <Button size="sm" className="me-2" onClick={() => onEdit(e)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => deleteExpense(e.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
