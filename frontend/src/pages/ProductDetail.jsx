import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios'

const ProductDetails = () => {    

  return (
    <div className='container mx-auto py-10'>
      <div className='flex flex-col md:flex-row items-center'>
        <img className='w-full md:w-1/2 h-96 object-cover rounded-lg' src={product.image} alt={product.name} />
        <div className='md:ml-10 mt-6 md:mt-0'>
          <h1 className='text-3xl font-bold'>{product.name}</h1>
          <p className='text-gray-600 mt-2'>{product.brand}</p>
          <p className='text-gray-800 font-bold mt-2'>${product.price}</p>
          <p className='text-gray-700 mt-4'>{product.description}</p>
          <p className='text-gray-700 mt-2'>Category: {product.category}</p>
          <p className='text-gray-700 mt-2'>Rating: {product.rating}</p>
          <p className='text-gray-700 mt-2'>Reviews: {product.numReviews}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
