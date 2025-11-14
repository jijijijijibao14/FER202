import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// --- 1. Async Thunk: Gọi API lấy danh sách người dùng ---
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// --- 2. Initial State ---
const initialState = {
  list: [],
  isLoading: false,
  error: null
};

// --- 3. Slice ---
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // ✅ Reducer đồng bộ: Toggle Admin Status
    toggleAdminStatus: (state, action) => {
      const userId = action.payload;
      const user = state.list.find(u => u.id === userId);
      if (user) {
        user.isAdmin = !user.isAdmin;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fulfilled
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      // Rejected
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// --- 4. Export ---
export const { toggleAdminStatus } = usersSlice.actions;
export default usersSlice.reducer;
