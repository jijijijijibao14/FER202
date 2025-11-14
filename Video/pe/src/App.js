import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import VideoList from './components/VideoList';

function App() {
  return (
    <BrowserRouter>
      {/* Header luôn hiển thị */}
      <Header />
      
      {/* Định nghĩa các trang */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<VideoList />} />
        {/* Thêm route cho Comment Form nếu cần */}
        {/* <Route path="/comment" element={<CommentForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;