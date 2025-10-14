import React from "react";
import HomeCarousel from "../components/carousel/HomeCarousel";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      {/* Bạn có thể thêm các section tiếp theo của trang Home ở dưới */}
      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
        </p>
      </div>
    </div>
  );
}
