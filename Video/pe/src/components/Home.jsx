import React from 'react';
// Sử dụng một URL ảnh placeholder dựa trên ảnh chụp màn hình
const imageUrl = "https://i.imgur.com/83dGj1k.png"; 

function Home() {
  return (
    <div className="container text-center mt-5">
      <img src={imageUrl} alt="Online Courses" className="img-fluid" style={{ maxWidth: '600px' }} />
      <h1 className="mt-4" style={{ color: 'blue' }}>Welcome to Online Courses</h1>
      <footer className="fixed-bottom bg-dark text-white text-center p-2">
        Created by FPTU
      </footer>
    </div>
  );
}

export default Home;