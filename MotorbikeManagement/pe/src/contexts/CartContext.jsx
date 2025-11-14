// src/contexts/CartContext.jsx
import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

// 1. Tạo Context
const CartContext = createContext();

// 2. Reducer cho Cart
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      {
        const existingItem = state.items.find(i => i.id === action.payload.id);
        if (existingItem) {
          // tăng số lượng
          return {
            ...state,
            items: state.items.map(i =>
              i.id === action.payload.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        } else {
          return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
          };
        }
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload.id),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

// 3. Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Thêm vào giỏ
  const addToCart = async (product) => {
    if (product.stock <= 0) return alert("Out of stock!");

    // Cập nhật stock trên server
    await axios.patch(`http://localhost:3001/products/${product.id}`, {
      stock: product.stock - 1,
    });

    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  // Xóa khỏi giỏ
  const removeFromCart = async (product) => {
    // restore stock trên server
    await axios.patch(`http://localhost:3001/products/${product.id}`, {
      stock: product.stock + product.quantity,
    });
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  // Update quantity
  const updateQuantity = async (product, quantity) => {
    const diff = quantity - product.quantity; // số lượng thay đổi
    if (product.stock - diff < 0) return alert("Not enough stock!");

    await axios.patch(`http://localhost:3001/products/${product.id}`, {
      stock: product.stock - diff,
    });

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: product.id, quantity },
    });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
