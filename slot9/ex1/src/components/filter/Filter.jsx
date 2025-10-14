import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import './filter.css';

export default function Filter({ onSearch, onFilter, onSort }) {
  const [searchText, setSearchText] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchText);
  };

  const handleFilterChange = (e) => {
    setYearFilter(e.target.value);
    if (onFilter) onFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    if (onSort) onSort(e.target.value);
  };

  return (
    <Card className="mb-4 p-3 filter-card">
      <Card.Title className="text-start" style={{ color: "#e67e22", fontSize: "1.5rem" }}>
        Filter Movies
      </Card.Title>
      <Form onSubmit={handleSearch}>
        <Row className="align-items-center flex-nowrap">
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Search by title or description"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={3}>
            <Form.Select value={yearFilter} onChange={handleFilterChange}>
              <option value="">Filter by year</option>
              <option value="<=2000">≤ 2000</option>
              <option value="2001-2015">2001 - 2015</option>
              <option value=">2015">&gt; 2015</option>
            </Form.Select>
          </Col>
          <Col xs={3}>
            <Form.Select value={sortOption} onChange={handleSortChange}>
              <option value="">Sort by</option>
              <option value="year-asc">Year ↑</option>
              <option value="year-desc">Year ↓</option>
              <option value="title-asc">Title A→Z</option>
              <option value="title-desc">Title Z→A</option>
              <option value="duration-asc">Duration ↑</option>
              <option value="duration-desc">Duration ↓</option>
            </Form.Select>
          </Col>
          <Col xs={2}>
            <Button type="submit" variant="primary" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}