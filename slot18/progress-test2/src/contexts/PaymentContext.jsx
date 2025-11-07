import React, { createContext, useContext, useReducer, useCallback } from 'react';
import * as api from '../services/api';

const PaymentContext = createContext();

const initialPaymentState = {
  payments: [],
  filters: {
    search: '',
    semester: '',
    courseName: '',
    sortBy: 'course_asc',
  },
  totalAmount: 0,
  loading: false,
  error: null,
};

// Helper function để tính tổng amount
const calculateTotal = (payments) => {
  return payments.reduce((sum, p) => sum + (p.amount || 0), 0);
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
    case 'CREATE_START':
    case 'UPDATE_START':
    case 'DELETE_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS': {
      const payments = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        loading: false,
        payments,
        totalAmount: calculateTotal(payments),
        error: null,
      };
    }

    case 'CREATE_SUCCESS': {
      const newPayment = action.payload;
      const updatedPayments = [...state.payments, newPayment];
      return {
        ...state,
        loading: false,
        payments: updatedPayments,
        totalAmount: calculateTotal(updatedPayments),
        error: null,
      };
    }

    case 'UPDATE_SUCCESS': {
      const updatedPayment = action.payload;
      const updatedPayments = state.payments.map((p) =>
        p.id === updatedPayment.id ? updatedPayment : p
      );
      return {
        ...state,
        loading: false,
        payments: updatedPayments,
        totalAmount: calculateTotal(updatedPayments),
        error: null,
      };
    }

    case 'DELETE_SUCCESS': {
      const deletedId = action.payload;
      const updatedPayments = state.payments.filter((p) => p.id !== deletedId);
      return {
        ...state,
        loading: false,
        payments: updatedPayments,
        totalAmount: calculateTotal(updatedPayments),
        error: null,
      };
    }

    case 'FETCH_FAILURE':
    case 'CREATE_FAILURE':
    case 'UPDATE_FAILURE':
    case 'DELETE_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.field]: action.value },
      };

    case 'RESET_FILTERS':
      return { ...state, filters: initialPaymentState.filters };

    default:
      return state;
  }
};

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);

  // READ: Lấy danh sách payments theo userId
  const fetchPayments = useCallback(async (userId) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const payments = await api.getPaymentsByUser(userId);
      dispatch({ type: 'FETCH_SUCCESS', payload: payments });
    } catch (error) {
      dispatch({
        type: 'FETCH_FAILURE',
payload: error.message || 'Failed to load payments',
      });
    }
  }, []);

  // READ: Lấy payment theo id
  const getPaymentById = useCallback(async (paymentId) => {
    try {
      const payment = await api.getPaymentById(paymentId);
      return payment;
    } catch (error) {
      dispatch({
        type: 'FETCH_FAILURE',
        payload: error.message || 'Failed to fetch payment',
      });
      throw error;
    }
  }, []);

  // CREATE: Tạo payment mới
  const createPayment = useCallback(async (paymentData) => {
    dispatch({ type: 'CREATE_START' });
    try {
      const newPayment = await api.createPayment(paymentData);
      dispatch({ type: 'CREATE_SUCCESS', payload: newPayment });
      return { success: true, payment: newPayment };
    } catch (error) {
      const errorMessage = error.message || 'Failed to create payment';
      dispatch({ type: 'CREATE_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // UPDATE: Cập nhật payment
  const updatePayment = useCallback(async (paymentId, paymentData) => {
    dispatch({ type: 'UPDATE_START' });
    try {
      const updatedPayment = await api.updatePayment(paymentId, paymentData);
      dispatch({ type: 'UPDATE_SUCCESS', payload: updatedPayment });
      return { success: true, payment: updatedPayment };
    } catch (error) {
      const errorMessage = error.message || 'Failed to update payment';
      dispatch({ type: 'UPDATE_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // DELETE: Xóa payment
  const deletePayment = useCallback(async (paymentId) => {
    dispatch({ type: 'DELETE_START' });
    try {
      await api.deletePayment(paymentId);
      dispatch({ type: 'DELETE_SUCCESS', payload: paymentId });
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Failed to delete payment';
      dispatch({ type: 'DELETE_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // FILTER & SORTING: Lọc và sắp xếp payments
  const getFilteredAndSortedPayments = useCallback(() => {
    let filtered = state.payments.filter((p) => {
      const search = state.filters.search.toLowerCase();
      const matchSearch =
        !search ||
        p.semester?.toLowerCase().includes(search) ||
        p.courseName?.toLowerCase().includes(search);

      const matchSemester =
        !state.filters.semester || p.semester === state.filters.semester;

      const matchCourse =
        !state.filters.courseName || p.courseName === state.filters.courseName;

      return matchSearch && matchSemester && matchCourse;
    });

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      switch (state.filters.sortBy) {
        case 'course_asc':
          return (a.courseName || '').localeCompare(b.courseName || '');
        case 'course_desc':
return (b.courseName || '').localeCompare(a.courseName || '');
        case 'date_asc':
          return (a.date || '').localeCompare(b.date || '');
        case 'date_desc':
          return (b.date || '').localeCompare(a.date || '');
        case 'amount_asc':
          return (a.amount || 0) - (b.amount || 0);
        case 'amount_desc':
          return (b.amount || 0) - (a.amount || 0);
        case 'semester_asc':
          return (a.semester || '').localeCompare(b.semester || '');
        case 'semester_desc':
          return (b.semester || '').localeCompare(a.semester || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [state.payments, state.filters]);

  // Tính tổng amount của filtered payments
  const getFilteredTotal = useCallback(() => {
    const filtered = getFilteredAndSortedPayments();
    return calculateTotal(filtered);
  }, [getFilteredAndSortedPayments]);

  // Lấy danh sách unique semesters từ payments
  const getUniqueSemesters = useCallback(() => {
    const semesters = new Set(state.payments.map((p) => p.semester).filter(Boolean));
    return Array.from(semesters).sort();
  }, [state.payments]);

  // Lấy danh sách unique course names từ payments
  const getUniqueCourseNames = useCallback(() => {
    const courses = new Set(state.payments.map((p) => p.courseName).filter(Boolean));
    return Array.from(courses).sort();
  }, [state.payments]);

  const value = {
    ...state,
    dispatch,
    // CRUD Operations
    fetchPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
    // Filter & Sorting
    getFilteredAndSortedPayments,
    getFilteredTotal,
    getUniqueSemesters,
    getUniqueCourseNames,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
