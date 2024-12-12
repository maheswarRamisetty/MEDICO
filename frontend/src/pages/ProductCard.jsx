import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

 

  return (
    <div className='bg-white rounded-lg shadow-md p-4 cursor-pointer' onClick={viewDetails}>
      <img className='w-full h-48 object-cover rounded-t-lg' src={product.image} alt={product.name} />
      <h2 className='text-lg font-semibold mt-4'>{product.name}</h2>
      <p className='text-gray-600'>{product.brand}</p>
      <p className='text-gray-800 font-bold'>${product.price}</p>
    </div>
  );
};

export default ProductCard;
