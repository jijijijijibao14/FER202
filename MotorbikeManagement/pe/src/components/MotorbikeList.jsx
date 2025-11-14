import {Button, Card, Modal,Toast, ToastContainer} from "react-bootstrap";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";


const truncate = (text, max = 120) => {
    if (!text) return "";
    const t = text.replace(/\s+/g, ' ').trim();
    return t.length <= max ? t : `${t.slice(0, max).trim()}...`;
}


function MotorbikeList({id, image, name, year, price, stock, brand, text}){
    const shortDesc = truncate(text, 80);
    const { addToCart } = useCart();
    
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleClickCart = () => {
    addToCart({ id, image, name, year, price, stock, brand, text });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

    return (
        <>
        <Card style={{ width: 350}} >
            
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Img style={{height: 250}}  variant ="top" src={image} />
                <Card.Text>{shortDesc}</Card.Text>
                <div>
                    <p><strong>Year:</strong> {year}</p>
                    <p><strong>Price:</strong> {price} $</p>
                    <p><strong>Stock:</strong> {stock}</p>
                </div>
                
                <div className="mt-auto d-flex justify-content-between">
                    <Button variant="primary" onClick={handleShowModal}>View Details</Button>
                    <Button variant="success" size="md" onClick={handleClickCart}>Add to Cart</Button>
                </div>
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Year:</strong> {year} | <strong>Price:</strong> {price} $</p>
                <img src={image} alt={name} className="img-fluid mb-3" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        <ToastContainer position ="top-center" className="p-3 position-fixed">
            <Toast 
                onClose={() => setShowToast(false)} 
                show={showToast} 
                delay={2000}
                autohide
                className="text-center">
                <Toast.Body>Added to your Cart!</Toast.Body>  
            </Toast>
        </ToastContainer>
        </>
    );

}

export default MotorbikeList;