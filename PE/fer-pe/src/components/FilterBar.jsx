import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const FilterBar = () => {
    // Giả định có state quản lý filter/sort được truyền từ PaymentContext
    // const { state, dispatch } = useMotorbikeContext(); 
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Form>
                    <Row className="justify-content-center g-3">
                        {/* Search by semester or course name  */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                    <Form.Select>
                                        <option value="">All Categories</option>
                                        <option value="">Food</option>
                                        <option value="">Utilities</option>
                                        <option value="">Entertainment</option>
                                    </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;
