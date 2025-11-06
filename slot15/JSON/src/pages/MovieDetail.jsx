import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import movieApi from '../api/movieAPI';

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch movie by ID
        const movieResponse = await movieApi.get(`/movies/${movieId}`);
        const movieData = movieResponse.data;
        setMovie(movieData);

        // Fetch genre information
        if (movieData.genreId) {
          try {
            const genreResponse = await movieApi.get(`/genres/${movieData.genreId}`);
            setGenre(genreResponse.data);
          } catch (genreError) {
            console.error('Error fetching genre:', genreError);
            // Try to find genre in list
            const genresResponse = await movieApi.get('/genres');
            const foundGenre = genresResponse.data.find(g => g.id == movieData.genreId);
            if (foundGenre) {
              setGenre(foundGenre);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching movie detail:', err);
        setError('Không thể tải thông tin phim. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" variant="primary" className="me-2" />
        <Alert variant="info" className="mt-3">Đang tải thông tin phim...</Alert>
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Lỗi</Alert.Heading>
          <p>{error || 'Không tìm thấy phim'}</p>
          <Button variant="primary" onClick={() => navigate(-1)}>Quay lại</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <Link to="/movies">
            <Button variant="secondary" className="mb-3">← Quay lại</Button>
          </Link>
        </Col>
      </Row>
      
      <Row>
        <Col md={4}>
          <Image 
            src={movie.avatar || '/placeholder.png'} 
            alt={movie.title} 
            fluid 
            rounded
            style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={8}>
          <h1 className="mb-3">{movie.title}</h1>
          
          {genre && (
<div className="mb-3">
              <Badge bg="primary" className="me-2" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                {genre.name}
              </Badge>
            </div>
          )}

          <Row className="mb-4">
            <Col md={6}>
              <h5>Năm phát hành</h5>
              <p className="fs-5">{movie.year || 'N/A'}</p>
            </Col>
            <Col md={6}>
              <h5>Thời lượng</h5>
              <p className="fs-5">{movie.duration ? `${movie.duration} phút` : 'N/A'}</p>
            </Col>
          </Row>

          {movie.country && (
            <div className="mb-4">
              <h5>Quốc gia</h5>
              <p className="fs-5">{movie.country}</p>
            </div>
          )}

          {movie.description && (
            <div className="mb-4">
              <h5>Mô tả</h5>
              <p className="fs-6" style={{ lineHeight: '1.8', textAlign: 'justify' }}>
                {movie.description}
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
