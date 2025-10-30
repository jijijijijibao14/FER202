import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useMovieState, useMovieDispatch } from "../contexts/MovieContext";

const FilterBar = () => {
  const { movies, filteredMovies, genres } = useMovieState();
  const { dispatch } = useMovieDispatch();
  const [filters, setFilters] = useState({ name: "", genreId: "", duration: "", sort: "" });

  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    dispatch({ type: "FILTER_MOVIES", payload: newFilters });
  };

  return (
    <Form className="border p-3 rounded bg-light mb-3">
      <Row className="g-2">
        <Col md={4}>
          <Form.Control
            name="name"
            placeholder="Tìm kiếm theo tên phim"
            value={filters.name}
            onChange={handleChange}
          />
        </Col>
        <Col md={3}>
          <Form.Select name="genreId" value={filters.genreId} onChange={handleChange}>
            <option value="">Tất cả thể loại</option>
            {genres.length > 0 ? (
              genres.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)
            ) : (
              <option disabled>Đang tải...</option>
            )}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select name="duration" value={filters.duration} onChange={handleChange}>
            <option value="">Thời lượng</option>
            <option value="short">Dưới 100 phút</option>
            <option value="medium">100 - 120 phút</option>
            <option value="long">Trên 120 phút</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select name="sort" value={filters.sort} onChange={handleChange}>
            <option value="">Sắp xếp</option>
            <option value="asc">Tên ↑</option>
            <option value="desc">Tên ↓</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;
