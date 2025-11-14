import React from "react";
import { Card } from "react-bootstrap";
import { formatVND } from "../utils/format";

export default function TotalCard({ total }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Total of Expenses</Card.Title>
        <h3>{formatVND(total)}</h3>
      </Card.Body>
    </Card>
  );
}
