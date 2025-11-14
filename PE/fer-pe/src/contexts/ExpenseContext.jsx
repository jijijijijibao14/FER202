import React, { createContext, useContext, useReducer, useCallback } from 'react';
import * as api from '../services/api';

const ExpenseContext = createContext();

const initialExpenseState = {
  expenses: [],
  filters: {
    search: '',
    name: '',
    amount: '',
    sortBy: 'course_asc',
  },
  totalAmount: 0,
  loading: false,
  error: null,
};

// Helper function để tính tổng amount
const calculateTotal = (expenses) => {
  return expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
    case 'CREATE_START':
    case 'UPDATE_START':
    case 'DELETE_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS': {
      const expenses = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        loading: false,
        expenses,
        totalAmount: calculateTotal(expenses),
        error: null,
      };
    }

    case 'CREATE_SUCCESS': {
      const newExpense = action.payload;
      const updatedExpenses = [...state.expenses, newExpense];
      return {
        ...state,
        loading: false,
        expenses: updatedExpenses,
        totalAmount: calculateTotal(updatedExpenses),
        error: null,
      };
    }

    case 'UPDATE_SUCCESS': {
      const updatedExpense = action.payload;
      const updatedExpenses = state.rxpenses.map((e) =>
        e.id === updatedExpense.id ? updatedExpense : e
      );
      return {
        ...state,
        loading: false,
        expenses: updatedExpenses,
        totalAmount: calculateTotal(updatedExpenses),
        error: null,
      };
    }

    case 'DELETE_SUCCESS': {
      const deletedId = action.payload;
      const updatedExpenses = state.expenses.filter((p) => p.id !== deletedId);
      return {
        ...state,
        loading: false,
        expenses: updatedExpenses,
        totalAmount: calculateTotal(updatedExpenses),
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
      return { ...state, filters: initialExpenseState.filters };

    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialExpenseState);

  // READ: Lấy danh sách payments theo userId
  const fetchExpenses = useCallback(async (userId) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const payments = await api.getExpensesByUser(userId);
      dispatch({ type: 'FETCH_SUCCESS', payload: payments });
    } catch (error) {
      dispatch({
        type: 'FETCH_FAILURE',
payload: error.message || 'Failed to load Expenses',
      });
    }
  }, []);

  // READ: Lấy payment theo id
  const getExpenseById = useCallback(async (expensetId) => {
    try {
      const expense = await api.getExpenseById(expenseId);
      return expense;
    } catch (error) {
      dispatch({
        type: 'FETCH_FAILURE',
        payload: error.message || 'Failed to fetch Expense',
      });
      throw error;
    }
  }, []);

  // CREATE: Tạo payment mới
  const createExpense = useCallback(async (expenseData) => {
    dispatch({ type: 'CREATE_START' });
    try {
      const newExpense = await api.createExpense(expenseData);
      dispatch({ type: 'CREATE_SUCCESS', payload: newExpense });
      return { success: true, expense: newExpense };
    } catch (error) {
      const errorMessage = error.message || 'Failed to create Expense';
      dispatch({ type: 'CREATE_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // UPDATE: Cập nhật payment
  const updateExpense = useCallback(async (expenseId, expenseData) => {
    dispatch({ type: 'UPDATE_START' });
    try {
      const updatedExpense = await api.updateExpense(expenseId, expenseData);
      dispatch({ type: 'UPDATE_SUCCESS', payload: updatedExpense });
      return { success: true, expense: updatedExpense };
    } catch (error) {
      const errorMessage = error.message || 'Failed to update payment';
      dispatch({ type: 'UPDATE_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // DELETE: Xóa payment
  const deleteExpense = useCallback(async (expenseId) => {
    dispatch({ type: 'DELETE_START' });
    try {
      await api.deleteExpenset(expenseId);
      dispatch({ type: 'DELETE_SUCCESS', payload: expenseId });
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Failed to delete Expense';
      dispatch({ type: 'DELETE_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  // FILTER & SORTING: Lọc và sắp xếp payments
  const getFilteredAndSortedExpenses = useCallback(() => {
    let filtered = state.expenses.filter((p) => {
      const search = state.filters.search.toLowerCase();
      const matchSearch =
        !search ||
        e.category?.toLowerCase().includes(search);

      const matchCategory =
        !state.filters.category || p.category === state.filters.category;

      return matchSearch && matchCategory;
    });

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      switch (state.filters.sortBy) {
        case 'course_asc':
          return (a.Category || '').localeCompare(b.Category || '');
        case 'course_desc':
return (b.Category || '').localeCompare(a.Category || '');

        default:
          return 0;
      }
    });

    return filtered;
  }, [state.expenses, state.filters]);

  // Tính tổng amount của filtered payments
  const getFilteredTotal = useCallback(() => {
    const filtered = getFilteredAndSortedExpenses();
    return calculateTotal(filtered);
  }, [getFilteredAndSortedExpenses]);


  const value = {
    ...state,
    dispatch,
    getFilteredTotal,

  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);
