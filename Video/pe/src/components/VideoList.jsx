import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Video from './Video'; // Import component con

function VideoList() {
  // Quản lý trạng thái bằng useState
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API khi component được render lần đầu 
  useEffect(() => {
    axios.get('http://localhost:3001/videos')
      .then(response => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy 1 lần

  // Xử lý các trạng thái
  if (loading) {
    return <div className="container text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger">Error: {error}</div></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Lặp qua danh sách video và render component Video */}
        {videos.map(video => (
          <Video key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default VideoList;