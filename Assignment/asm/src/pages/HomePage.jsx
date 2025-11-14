import React, { useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import FilterCard from "../components/FilterCard";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import TotalCard from "../components/TotalCard";
import { useExpenses } from "../contexts/ExpenseContext";

export default function HomePage() {
  const { list } = useExpenses();
  const [filter, setFilter] = useState(""); // nhận từ FilterCard
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    if (!filter) return list;
    return list.filter((e) => e.category === filter);
  }, [list, filter]);

  const total = filtered.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={5}>
            <TotalCard total={total} />
            <AddExpenseForm editing={editing} setEditing={setEditing} />
          </Col>
          <Col md={7}>
            {/* ✅ FilterCard mới (dropdown) */}
            <FilterCard filter={filter} setFilter={setFilter} />
            <ExpenseTable list={filtered} onEdit={setEditing} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
