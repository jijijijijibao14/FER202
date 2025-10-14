import {Button, Card, Badge, Modal, Toast, ToastContainer} from "react-bootstrap";
import { useState } from "react";
import "./moviesCard.css";


const truncate = (text, max = 120) => {
    if (!text) return "";
    const t = text.replace(/\s+/g, ' ').trim();
    return t.length <= max ? t : `${t.slice(0, max).trim()}...`;
}



export default function MovieCard({img, title, text, genre, year, country}){
    const shortDesc = truncate(text, 80);
    
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleClickFavorite = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

    return (
        <>
        <Card style={{ width: 350}} >
            <Card.Img variant ="top" src={img} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{shortDesc}</Card.Text>
                <div>{genre} | {country} | {year} </div>
                
                <div className="mt-auto d-flex justify-content-between">
                    <Button variant="primary" onClick={handleShowModal}>Details</Button>
                    <Button variant="outline-warning" size="sm" onClick={handleClickFavorite}>Add your Favourites!</Button>
                </div>
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={img} alt={title} className="img-fluid mb-3" />
                <p><strong>Genre:</strong> {genre}</p>
                <p><strong>Country:</strong> {country}</p>
                <p><strong>Year:</strong> {year}</p>
                <p>{text}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        <ToastContainer position ="bottom-end" className="p-3">
            <Toast 
                onClose={() => setShowToast(false)} 
                show={showToast} 
                delay={2000}
                autohide
                className="custom-toast">
                <Toast.Body>Added to your favourites!</Toast.Body>  
            </Toast>
        </ToastContainer>
        </>
    );

}