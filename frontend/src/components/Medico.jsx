import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Spinner from './Spinner';
import toast,{Toaster} from 'react-hot-toast';

const Medico = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { token, backendUrl, addToCart } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); 
        await new Promise((resolve) => setTimeout(resolve, 500)); 
        
        const response = await axios.get(`${backendUrl}/api/product/products`);
        if (response.data.success) {
          setProducts(response.data.products); 
        } else {
          console.error('Failed to fetch products:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, backendUrl]);

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
    toast.success('Item Added to cart!', {
      style: {
        border: '1px solid #4caf50',
        padding: '10px 15px',
        borderRadius: '8px',
        background: '#fff',
        color: '#333',
        fontWeight: '500',
        fontSize: '14px',
      },
    });
  };

  const handleViewReviews = (medicine) => {
    navigate(`/medicine/${medicine.slug}/reviews`);
  };

  if (loading) {
    return <Spinner />; g
  }

  return (
    <div className='p-4'>
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className='text-2xl font-bold mb-4'>Available Medicines</h1>
      {products.length === 0 ? (
        <p>No medicines available at the moment.</p>
      ) : (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((medicine) => (
            <li key={medicine.id} className='border p-4 rounded-lg shadow-md'>
              <img
                src={medicine.image}
                alt={medicine.name}
                className='w-full h-40 object-cover mb-4 rounded'
              />
              <h2 className='text-lg font-semibold'>{medicine.name}</h2>
              <p className='text-gray-600 mb-2'>{medicine.description}</p>
              <span className='text-gray-800 font-bold'>${medicine.price}</span>
              <div className='mt-2'>
                <button
                  onClick={() => handleAddToCart(medicine)}
                  className='bg-primary text-white px-4 py-2 rounded-full mr-2'
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleViewReviews(medicine)}
                  className='bg-gray-300 text-gray-700 px-4 py-2 rounded-full'
                >
                  Reviews
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Medico;
