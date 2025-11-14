import React, { useEffect, useState } from 'react';
import MotorbikeList from '../components/MotorbikeList';
import FilterBar from '../components/FilterBar';
import axios from 'axios';
import { useMotorbikeContext } from '../contexts/MotorbikeContext';
import NavigationHeader from '../components/NavigationHeader';

const ListMotorbikePage = () => {
  const { state } = useMotorbikeContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu products từ JSON server
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="text-center">
      <NavigationHeader/>
        <h1>Motorbike List</h1>
            <FilterBar/>
            <div className="d-flex flex-wrap gap-3">
                {state.filteredProducts.length > 0 ? (
                    state.filteredProducts.map(p => (
                        <MotorbikeList key={p.id} {...p} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        
    </div>
  );
};

export default ListMotorbikePage;
