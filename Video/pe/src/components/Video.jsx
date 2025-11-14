import React from 'react';
import PropTypes from 'prop-types';

function Video({ video }) {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{video.title}</h5>
          <p className="card-text">{video.description}</p>
          
          {/* Nhúng video iframe [cite: 14] */}
          <div className="embed-responsive embed-responsive-16by9 mb-3">
            <iframe 
              className="embed-responsive-item"
              width="100%" 
              height="315" 
              src={video.url.trim()} // Thêm .trim() để xóa khoảng trắng
              title={video.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen>
            </iframe>
          </div>

          <h6>Comments</h6>
          <ul className="list-unstyled">
            {video.comments.length > 0 ? (
              video.comments.map(comment => (
                <li key={comment.id}><strong>{comment.user}:</strong> {comment.text}</li>
              ))
            ) : (
              <li>No comments yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Định nghĩa PropTypes theo yêu cầu [cite: 15-18]
Video.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
};

export default Video;