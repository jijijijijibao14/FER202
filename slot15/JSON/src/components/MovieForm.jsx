import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';

// Danh sách các danh mục phim
const movieCategories = [
    'Hành động',
    'Kinh dị',
    'Hài kịch',
    'Tình cảm',
    'Khoa học viễn tưởng',
    'Phiêu lưu',
    'Hoạt hình',
    'Tài liệu',
    'Âm nhạc',
    'Chiến tranh',
    'Gia đình',
    'Tâm lý'
];

// Component con tái sử dụng cho các trường input
const MovieFields = ({ currentMovie, handleInputChange, handleFileChange, imagePreview }) => (
    <>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="formAvatar">
                    <Form.Label>Ảnh Avatar Phim</Form.Label>
                    <Form.Control 
                        type="file" 
                        name="avatarFile" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mb-2"
                    />
                    <Form.Control 
                        type="text" 
                        name="avatar" 
                        value={currentMovie.avatar || ''} 
                        onChange={handleInputChange} 
                        placeholder="Hoặc nhập URL hình ảnh" 
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <Image src={imagePreview} alt="Preview" thumbnail style={{ maxWidth: '200px', maxHeight: '150px' }} />
                        </div>
                    )}
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="formName">
                <Form.Label>Tên Phim</Form.Label>
                <Form.Control type="text" name="name" value={currentMovie.name || ''} onChange={handleInputChange} placeholder="Tên phim" required />
                </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={4}>
                <Form.Group controlId="formCategory">
                    <Form.Label>Danh mục</Form.Label>
                    <Form.Select 
                        name="category" 
                        value={currentMovie.category || ''} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Chọn danh mục</option>
                        {movieCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group controlId="formDuration">
                <Form.Label>Thời lượng (phút)</Form.Label>
                <Form.Control type="number" name="duration" value={currentMovie.duration || ''} onChange={handleInputChange} placeholder="Phút" required />
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group controlId="formYear">
                <Form.Label>Năm</Form.Label>
                <Form.Control type="number" name="year" value={currentMovie.year || ''} onChange={handleInputChange} placeholder="Năm" required />
            </Form.Group>
            </Col>
          
        </Row>
    </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal } = state;
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { name: e.target.name, value: e.target.value } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo URL preview cho ảnh
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        // Cập nhật avatar trong state với base64 string
        dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value: imageUrl } });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCloseEditModal = () => {
      dispatch({ type: 'CLOSE_EDIT_MODAL' });
      setImagePreview(''); // Reset preview khi đóng modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Chuẩn hóa dữ liệu trước khi gửi đi
    const dataToSend = {
      ...currentMovie,
      duration: parseInt(currentMovie.duration || 0),
      year: parseInt(currentMovie.year || 0),
      rating: parseFloat(currentMovie.rating || 0)
    };
    
    // Gọi hàm CRUD từ Context
    const success = await handleCreateOrUpdate(dataToSend, isEditing !== null, isEditing);
    
    // Reset preview nếu thành công và đang tạo mới
    if (success && isEditing === null) {
      setImagePreview('');
    }
  };

  // Logic cho Form Thêm mới (khi isEditing là null)
  const isCreating = isEditing === null; 
  const createFormProps = {
    currentMovie: isCreating ? currentMovie : initialMovieState.currentMovie, 
    handleInputChange: isCreating ? handleInputChange : () => {},
    handleFileChange: isCreating ? handleFileChange : () => {},
    imagePreview: isCreating ? imagePreview : currentMovie.avatar
  };

  return (
    <>
      {/* FORM THÊM MỚI (Luôn hiển thị) */}
      <Container className="p-3 mb-4 border">
        <h3 className="mb-3">📽️ Thêm Phim Mới</h3>
        <Form onSubmit={handleSubmit}>
            <MovieFields {...createFormProps} />
            <div className="d-flex gap-2 mt-3">
                <Button variant="success" type="submit">
                ➕ Thêm Phim
                </Button>
            </div>
        </Form>
      </Container>
      
      {/* MODAL CHỈNH SỬA (Chỉ hiện khi showEditModal là true) */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <MovieFields currentMovie={currentMovie} handleInputChange={handleInputChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>Hủy</Button>
                <Button variant="warning" type="submit">Lưu Thay Đổi</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;

