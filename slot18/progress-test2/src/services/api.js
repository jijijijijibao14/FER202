// api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';

// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Lấy toàn bộ users
export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// 2. Lấy payments theo userId
export const getPaymentsByUser = async (userId) => {
  try {
    const response = await API.get('/payments', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch payments');
  }
};

// 3. Lấy payment theo id
export const getPaymentById = async (paymentId) => {
  try {
    const response = await API.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch payment');
  }
};

// 4. Tạo payment mới
export const createPayment = async (paymentData) => {
  try {
    const response = await API.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create payment');
  }
};

// 5. Cập nhật payment
export const updatePayment = async (paymentId, paymentData) => {
  try {
    const response = await API.put(`/payments/${paymentId}`, paymentData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update payment');
  }
};

// 6. Xóa payment
export const deletePayment = async (paymentId) => {
  try {
    await API.delete(`/payments/${paymentId}`);
    return paymentId;
  } catch (error) {
    throw new Error('Failed to delete payment');
  }
};

// 7. Lấy user theo id
export const getUserById = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

// 8. Cập nhật user (để ban/unban account)
export const updateUser = async (userId, userData) => {
  try {
    const response = await API.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};