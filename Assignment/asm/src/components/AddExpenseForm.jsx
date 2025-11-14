import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useExpenses } from "../contexts/ExpenseContext";
import { useAuth } from "../contexts/AuthContext";

export default function AddExpenseForm({ editing, setEditing }) {
  const { addExpense, updateExpense } = useExpenses();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", amount: "", category: "", date: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, amount, category, date } = form;
    if (!name || !category) return setError("Name and Category must not be empty");
    if (Number(amount) <= 0) return setError("Amount must be > 0");

    const payload = { ...form, amount: Number(amount), userId: user.id };
    if (editing) await updateExpense(payload);
    else await addExpense(payload);

    setForm({ name: "", amount: "", category: "", date: "" });
    setEditing(null);
    setError("");
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{editing ? "Edit Expense" : "Add Expense"}</Card.Title>
        {error && <div className="text-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Control className="mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <Form.Control className="mb-2" name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} />
          <Form.Control className="mb-2" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <Form.Control className="mb-2" name="date" type="date" value={form.date} onChange={handleChange} />
          <Button type="submit" className="me-2">{editing ? "Save" : "Add expense"}</Button>
          {editing && <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>}
        </Form>
      </Card.Body>
    </Card>
  );
}
