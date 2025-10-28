import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import các component cần thiết
import Home from './components/Home';
import Products from './components/Products';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import ProductDetail from './components/ProductDetail';


function App() {
  return (
    <>
      <Navigation /> {/* Hiển thị thanh điều hướng ở mọi nơi */}
      <div className="container">
        <Routes>
          {/* 1. Route Cơ bản */}
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/san-pham/:productId" element={<ProductDetail/>}/>
        </Routes>
      </div>
    </>
  );

}

export default App;
