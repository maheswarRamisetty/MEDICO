import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }

    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
  };

  return (
    <div className='flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-md'>
      <div className='flex items-center gap-4'>
        <p className='text-lg font-semibold'>
          {aToken ? 'Admin Dashboard' : 'Doctor Dashboard'}
        </p>
      </div>
      <button
        onClick={logout}
        className='bg-red-500 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-full transition duration-300'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
