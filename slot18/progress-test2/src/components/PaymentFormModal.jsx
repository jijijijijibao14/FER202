// PaymentFormModal.jsx - Modal form để Create và Update payment
import React, { useEffect, useReducer } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { usePaymentContext } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';

const initialFormState = {
  formData: {
    semester: '',
    courseName: '',
    amount: '',
    date: '',
  },
  errors: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        errors: { ...state.errors, [action.field]: '' },
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'RESET_FORM':
      return initialFormState;
    case 'LOAD_PAYMENT':
      return {
        ...state,
        formData: {
          semester: action.payload.semester || '',
          courseName: action.payload.courseName || '',
          amount: action.payload.amount || '',
          date: action.payload.date || '',
        },
      };
    default:
      return state;
  }
}

const PaymentFormModal = ({ show, onHide, paymentId = null }) => {
  const { user } = useAuth();
  const { createPayment, updatePayment, getPaymentById, loading, error } =
    usePaymentContext();
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const isEditMode = !!paymentId;

  // Load payment data khi edit
  useEffect(() => {
    if (show && isEditMode && paymentId) {
      loadPaymentData();
    } else if (show && !isEditMode) {
      dispatch({ type: 'RESET_FORM' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, paymentId]);

  const loadPaymentData = async () => {
    try {
      const payment = await getPaymentById(paymentId);
      dispatch({ type: 'LOAD_PAYMENT', payload: payment });
    } catch (err) {
      console.error('Failed to load payment:', err);
    }
  };

  const validateForm = () => {
    const errors = {};
    const { semester, courseName, amount, date } = formState.formData;

    if (!semester.trim()) {
      errors.semester = 'Semester is required.';
    }

    if (!courseName.trim()) {
      errors.courseName = 'Course name is required.';
    }

    if (!amount || amount <= 0) {
      errors.amount = 'Amount must be greater than 0.';
    }

    if (!date.trim()) {
      errors.date = 'Date is required.';
    } else {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        errors.date = 'Invalid date format.';
      }
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
dispatch({ type: 'SET_ERRORS', errors: validationErrors });
      return;
    }

    const paymentData = {
      userId: user.id,
      semester: formState.formData.semester.trim(),
      courseName: formState.formData.courseName.trim(),
      amount: Number(formState.formData.amount),
      date: formState.formData.date,
    };

    let result;
    if (isEditMode) {
      result = await updatePayment(paymentId, paymentData);
    } else {
      result = await createPayment(paymentData);
    }

    if (result.success) {
      dispatch({ type: 'RESET_FORM' });
      onHide();
    }
  };

  const handleClose = () => {
    dispatch({ type: 'RESET_FORM' });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit Payment' : 'Add New Payment'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mb-3" dismissible>
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Semester *</Form.Label>
            <Form.Control
              type="text"
              name="semester"
              value={formState.formData.semester}
              onChange={handleChange}
              isInvalid={!!formState.errors.semester}
              placeholder="e.g., Fall 2025"
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors.semester}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course Name *</Form.Label>
            <Form.Control
              type="text"
              name="courseName"
              value={formState.formData.courseName}
              onChange={handleChange}
              isInvalid={!!formState.errors.courseName}
              placeholder="e.g., Web Development"
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors.courseName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount (VND) *</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formState.formData.amount}
              onChange={handleChange}
              isInvalid={!!formState.errors.amount}
              placeholder="e.g., 3500000"
              min="1"
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors.amount}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date *</Form.Label>
            <Form.Control
              type="date"
              name="date"
value={formState.formData.date}
              onChange={handleChange}
              isInvalid={!!formState.errors.date}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors.date}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                {isEditMode ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditMode ? 'Update Payment' : 'Create Payment'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PaymentFormModal;