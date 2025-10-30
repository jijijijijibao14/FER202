// src/reducers/movieReducers.jsx
export const initialMovieState = {
  movies: [],
  filteredMovies: [],
  genres: [], 
  loading: false, 
  isEditing: null, 
  currentMovie: { avatar: '', name: '', category: '', duration: '', year: '', rating: '' },
  showEditModal: false,   
  showDeleteModal: false, 
  movieToDelete: null     
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { 
        ...state, 
        movies: action.payload, 
        filteredMovies: action.payload,  // ✅ luôn đồng bộ khi tải dữ liệu
        loading: false 
      };
    
    case 'SET_GENRES': 
      return { ...state, genres: action.payload };
      
    case 'START_LOADING':
      return { ...state, loading: true };
      
    case 'UPDATE_FIELD':
      return { 
          ...state, 
          currentMovie: { ...state.currentMovie, [action.payload.name]: action.payload.value }
      };

    case 'OPEN_EDIT_MODAL':
      // Gán dữ liệu phim vào currentMovie để điền vào form sửa
      return { 
        ...state, 
        currentMovie: action.payload, 
        isEditing: action.payload.id,
        showEditModal: true 
      };
      
    case 'CLOSE_EDIT_MODAL':
      return { 
        ...state, 
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false 
      };

    case 'OPEN_DELETE_MODAL':
        return {
            ...state,
            movieToDelete: action.payload,
            showDeleteModal: true 
        };

    case 'CLOSE_DELETE_MODAL':
        return {
            ...state,
            movieToDelete: null,
            showDeleteModal: false 
        };
      
    case 'RESET_FORM':
      return { 
        ...state, 
        currentMovie: initialMovieState.currentMovie, 
        isEditing: null,
        showEditModal: false,
      };

    case "FILTER_MOVIES": {
      const { name, genreId, duration, sort } = action.payload;
      let filtered = [...state.movies];

      if (name)
        filtered = filtered.filter((m) =>
          (m.name || "").toLowerCase().includes(name.toLowerCase())
        );
      
      if (genreId)
        filtered = filtered.filter((m) => String(m.genreId) === String(genreId));
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

