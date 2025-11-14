import React, { createContext, useContext, useReducer, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

const initialState = { list: [] };

function reducer(state, action) {
  switch (action.type) {
    case "SET_EXPENSES":
      return { ...state, list: action.payload };
    case "ADD_EXPENSE":
      return { ...state, list: [...state.list, action.payload] };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        list: state.list.map((e) => (e.id === action.payload.id ? action.payload : e)),
      };
    case "DELETE_EXPENSE":
      return { ...state, list: state.list.filter((e) => e.id !== action.payload) };
    default:
      return state;
  }
}

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchExpenses();
  }, [user]);

  const fetchExpenses = async () => {
    try {
      const res = await api.get(`/expenses?userId=${user.id}`);
      dispatch({ type: "SET_EXPENSES", payload: res.data });
    } catch (err) {
      console.error("Error loading expenses:", err);
    }
  };

  const addExpense = async (exp) => {
    const res = await api.post("/expenses", exp);
    dispatch({ type: "ADD_EXPENSE", payload: res.data });
  };

  const updateExpense = async (exp) => {
    const res = await api.put(`/expenses/${exp.id}`, exp);
    dispatch({ type: "UPDATE_EXPENSE", payload: res.data });
  };

  const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  };

  return (
    <ExpenseContext.Provider
      value={{
        list: state.list,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// ❗ Quan trọng: phải export đúng hook này
export const useExpenses = () => useContext(ExpenseContext);
