import React from "react";
import { Card, Form, Row, Col } from "react-bootstrap";

/**
 * Component FilterCard
 * @param {string} filter - giá trị category đang chọn
 * @param {function} setFilter - hàm thay đổi filter
 */
const FilterCard = ({ filter, setFilter }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Form>
          <Row className="justify-content-center g-3">
            <Col xs={12} md={8} lg={10}>
              <h5 className="mb-3">Filter</h5>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Food">Food</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterCard;
