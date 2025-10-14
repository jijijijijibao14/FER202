import React, { useState, useEffect, useCallback } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import MovieCard from '../components/movie/MovieCard';
import Filter from '../components/filter/Filter';
import { movies } from '../data/movies';

export default function MoviePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [sortOption, setSortOption] = useState("");
    
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [page, setPage] = useState(1);
    const cardsPerPage = 3;

    const applyFiltersAndSort = useCallback(() => {
        let currentMovies = [...movies];

        currentMovies = currentMovies.filter(movie => {
            const matchesSearch = searchTerm === "" || 
                                  movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  movie.description.toLowerCase().includes(searchTerm.toLowerCase());

            let matchesYear = true;
            const year = movie.year;

            switch (yearFilter) {
                case "<=2000":
                    matchesYear = year <= 2000;
                    break;
                case "2001-2015":
                    matchesYear = year >= 2001 && year <= 2015;
                    break;
                case ">2015":
                    matchesYear = year > 2015;
                    break;
                default:
                    matchesYear = true;
            }

            return matchesSearch && matchesYear;
        });

        if (sortOption) {
            currentMovies.sort((a, b) => {
                const [criteria, order] = sortOption.split("-");
                let comparison = 0;

                switch (criteria) {
                    case "year":
                        comparison = a.year - b.year;
                        break;
                    case "title":
                        comparison = a.title.localeCompare(b.title);
                        break;
                    case "duration":
                        comparison = a.duration - b.duration;
                        break;
                    default:
                        comparison = 0;
                }

                return order === "asc" ? comparison : -comparison;
            });
        }

        setFilteredMovies(currentMovies);
    }, [searchTerm, yearFilter, sortOption]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [applyFiltersAndSort]);

    const handleSearch = (text) => {
        setPage(1); 
        setSearchTerm(text);
    };

    const handleFilter = (range) => {
        setPage(1); 
        setYearFilter(range);
    };

    const handleSort = (option) => {
        setPage(1); 
        setSortOption(option);
    };


    const totalPages = Math.ceil(filteredMovies.length / cardsPerPage);

    const currentMovies = filteredMovies.slice(
        (page - 1) * cardsPerPage,
        page * cardsPerPage
    );

    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => setPage(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div className="container mt-3">
            <Row className="mb-4"> 
                <Col>
                    <Filter 
                        onSearch={handleSearch} 
                        onFilter={handleFilter} 
                        onSort={handleSort}
                    />
                </Col>
            </Row>

            <h2 className="mb-3 text-center">My Movies</h2>

            <Row xs={1} md={3} className="g-4">
                {currentMovies.map((movie) => (
                    <Col key={movie.id}>
                        <MovieCard
                            img={movie.poster}
                            title={movie.title}
                            text={movie.description}
                            genre={movie.genre}
                            year={movie.year}
                            country={movie.country}
                        />
                    </Col>
                ))}
            </Row>

            {filteredMovies.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>{paginationItems}</Pagination>
                </div>
            )}
            
            {filteredMovies.length === 0 && (
                <p className="text-start text-danger mt-4">Không tìm thấy bộ phim nào phù hợp với điều kiện.</p>
            )}
        </div>
    );
}