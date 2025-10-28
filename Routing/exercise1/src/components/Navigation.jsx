import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* NavLink tự động thêm class 'active' nếu đường dẫn khớp */}
      <NavLink 
        to="/" 
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Trang Chủ
      </NavLink>
      <NavLink 
        to="/product"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Product
      </NavLink>
      <NavLink 
        to="/contact"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Contact
      </NavLink>
    </nav>
  );
}

export default Navigation;
