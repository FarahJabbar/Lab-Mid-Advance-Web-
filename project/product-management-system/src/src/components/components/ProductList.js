import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="list-group">
          {list.map(product => (
            <li key={product.id} className="list-group-item">
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
