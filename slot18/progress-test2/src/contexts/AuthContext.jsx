// AuthContext.jsx quản lý xác thực người dùng bằng Context API và useReducer
import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến xác thực
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      // Lưu user vào Local Storage
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...initialAuthState, isAuthenticated: false, user: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// 4. Tạo AuthProvider để cung cấp Context cho các component con
export const AuthProvider = ({ children }) => {
  // khởi tạo từ localStorage nếu có
  let savedUser = null;
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      savedUser = JSON.parse(userStr);
    }
  } catch (error) {
    // Nếu localStorage bị corrupt, xóa và reset
    console.warn('Failed to parse user from localStorage:', error);
    localStorage.removeItem('user');
  }

  const [state, dispatch] = useReducer(authReducer, {
    ...initialAuthState,
    isAuthenticated: !!savedUser,
    user: savedUser,
  });

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Hàm login nhận usernameOrEmail (identifier) và password
  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const accounts = await api.getUsers();

      const user = accounts.find(
        (acc) =>
          (acc.username === usernameOrEmail ||
            (acc.email && acc.email === usernameOrEmail)) &&
          acc.password === password
      );

      if (user) {
        // Kiểm tra role và status: chỉ cho phép admin với status active
        if (user.role !== 'admin') {
          const errorMessage = 'Bạn không có quyền truy cập. Chỉ admin mới được phép đăng nhập.';
          dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
          return { success: false, error: errorMessage };
        }
        
        if (user.status !== 'active') {
          const errorMessage = 'Tài khoản bị khóa, bạn không có quyền truy cập.';
          dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
return { success: false, error: errorMessage };
        }

        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true, user };
      } else {
        const errorMessage = 'Invalid username/email or password!';
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed due to a network error.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const contextValue = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// 5. Custom hook dùng cho toàn app
export const useAuth = () => useContext(AuthContext);