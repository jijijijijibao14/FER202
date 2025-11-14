import React, { createContext, useContext, useReducer } from "react";
import api from "../services/api";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload.user, token: "fake-jwt", loading: false };
    case "LOGIN_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return initialState;
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await api.get(`/users?username=${usernameOrEmail}&password=${password}`);
      if (res.data.length === 0) {
        dispatch({ type: "LOGIN_FAIL", payload: "Invalid username/email or password!" });
        return { success: false };
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: res.data[0] } });
      return { success: true };
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: "Network error!" });
      return { success: false };
    }
  };

  const logout = () => dispatch({ type: "LOGOUT" });
  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
