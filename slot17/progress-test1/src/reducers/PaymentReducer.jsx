// src/reducers/movieReducers.jsx
export const initialMovieState = {
  payments: [],
  filteredPayment: [],
  loading: false, 
  isEditing: null, 
  currentPayment: { semester: '', courseName: '', amount: '', date: ''},
  showEditModal: false,   
  showDeleteModal: false, 
  paymentToDelete: null     
};

export const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAYMENTS':
      return { 
        ...state, 
        payments: action.payload, 
        filteredPayment: action.payload,  // ✅ luôn đồng bộ khi tải dữ liệu
        loading: false 
      };

    case 'START_LOADING':
      return { ...state, loading: true };
      
    case 'UPDATE_FIELD':
      return { 
          ...state, 
          currentPayment: { ...state.currentPayment, [action.payload.name]: action.payload.value }
      };

    case 'OPEN_EDIT_MODAL':
      return { 
        ...state, 
        currentPayment: action.payload, 
        isEditing: action.payload.id,
        showEditModal: true 
      };
      
    case 'CLOSE_EDIT_MODAL':
      return { 
        ...state, 
        currentPayment: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false 
      };

    case 'OPEN_DELETE_MODAL':
        return {
            ...state,
            paymentToDelete: action.payload,
            showDeleteModal: true 
        };

    case 'CLOSE_DELETE_MODAL':
        return {
            ...state,
            paymentToDelete: null,
            showDeleteModal: false 
        };
      
    case 'RESET_FORM':
      return { 
        ...state, 
        currentPayment: initialPaymentState.currentPayment, 
        isEditing: null,
        showEditModal: false,
      };

    case "FILTER_MOVIES": {
      const { name, paymentId, semester, sort } = action.payload;
      let filtered = [...state.payments];

      if (name)
        filtered = filtered.filter((m) =>
          (m.name || "").toLowerCase().includes(name.toLowerCase())
        );
      if (paymentId)
        filtered = filtered.filter((m) => String(m.paymentId) === String(paymentId));
      
      if (duration === "short") filtered = filtered.filter(m => m.duration < 100);
      if (duration === "medium") filtered = filtered.filter(m => m.duration >= 100 && m.duration <= 120);
      if (duration === "long") filtered = filtered.filter(m => m.duration > 120);
      
      const getName = (m) => m.name || m.title || "";
      if (sort === "asc") filtered.sort((a, b) => getName(a).localeCompare(getName(b)));
      if (sort === "desc") filtered.sort((a, b) => getName(b).localeCompare(getName(a)));

      return { ...state, filteredMovies: filtered };
    }


    default:
      return state;
  }
};

