import React, { createContext, useContext, useReducer, useEffect } from "react";
import * as api from "../services/api";

const MotorbikeContext = createContext();

const initialState = {
  products: [],
  filteredProducts: [],
  searchText: "",
  sortOrder: "", // "high" | "low"
};

// Reducer để quản lý filter/sort
function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, filteredProducts: action.payload };
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "APPLY_FILTER_SORT":
      let result = [...state.products];

      // Filter theo searchText
      if (state.searchText) {
        result = result.filter(p =>
          p.name.toLowerCase().includes(state.searchText.toLowerCase())
        );
      }

      // Sort theo giá
      if (state.sortOrder === "high") {
        result.sort((a, b) => b.price - a.price);
      } else if (state.sortOrder === "low") {
        result.sort((a, b) => a.price - b.price);
      }

      return { ...state, filteredProducts: result };
    default:
      return state;
  }
}

export const MotorbikeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Lấy dữ liệu sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Áp dụng filter + sort mỗi khi searchText hoặc sortOrder thay đổi
  useEffect(() => {
    dispatch({ type: "APPLY_FILTER_SORT" });
  }, [state.searchText, state.sortOrder, state.products]);

  return (
    <MotorbikeContext.Provider value={{ state, dispatch }}>
      {children}
    </MotorbikeContext.Provider>
  );
};

export const useMotorbikeContext = () => useContext(MotorbikeContext);
