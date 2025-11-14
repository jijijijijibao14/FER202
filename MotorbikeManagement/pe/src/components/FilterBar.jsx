import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useMotorbikeContext } from '../contexts/MotorbikeContext';

const FilterBar = () => {
    // Giả định có state quản lý filter/sort được truyền từ PaymentContext
    // const { state, dispatch } = useMotorbikeContext(); 
    const { state, dispatch } = useMotorbikeContext();

    const handleSearchChange = (e) => {
        dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value });
    };

    const handleSortChange = (e) => {
        dispatch({ type: "SET_SORT_ORDER", payload: e.target.value });
    };
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Form>
                    <Row className="justify-content-center g-3">
                        {/* Search by semester or course name  */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by Modal"
                                    value={state.searchText}
                                    onChange={handleSearchChange} />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Semester  */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Select 
                                    value={state.sortOrder}
                                    onChange={handleSortChange}
                                    >
                                        <option value="">Sort by Price</option>
                                        <option value="high">High to Low</option>
                                        <option value="low">Low to High</option>
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
