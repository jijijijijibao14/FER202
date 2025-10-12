import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from '../components/movies/MovieCard';
import {movies, AllGenres} from '../data/movies';

export default function MoviePage (){
    return (
        <div>
            <h2 className ="mb-3"> My Movies</h2>
            <Row xs={1} md={3} className = "g-4">
                {movies.map((movie) => (
                <Col classname ="md-4" key={movie.id}>
                    <MovieCard 
                       key = {movie.id}
                       img = {movie.poster}
                       title = {movie.title}
                       text = {movie.description}
                       genre = {movie.genre}/>   
                </Col>
                ))}
            </Row>
        </div>
    );
}