import React, { useReducer } from 'react';

const initialState = { isOn: false };

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { isOn: !state.isOn }; 
    default:
      return state;
  }
}


function ToggleLight() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Công Tắc Đèn</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Đèn hiện đang: {state.isOn ? 'Bật' : 'Tắt'}  
            </p>  
      <button
        onClick={() => dispatch({ type: 'TOGGLE' })}
        style={{
          padding: '10px 20px',
          backgroundColor: state.isOn ? 'green' : 'red',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {state.isOn ? 'Tắt đèn' : 'Bật đèn'}
      </button>
    </div>
  );
}

export default ToggleLight;
