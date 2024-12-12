import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';
import { FaShoppingCart } from 'react-icons/fa';
import toast,{Toaster} from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData, cartItems } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    toast.success("Logout Successful!");
  };

  const handleCartClick = () => {

      navigate('/cart');
    
  };

  return (
    <div className='flex items-center justify-between bg-white shadow-md py-4 px-6'>
      <img
        onClick={() => navigate('/')}
        className='w-32 cursor-pointer'
        src={assets.new_logo}
        alt='MED BRIDGE Logo'
      />
      <ul className='hidden md:flex items-center gap-6 font-medium'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700'}`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to='/doctors'
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700'}`
          }
        >
          ALL DOCTORS
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700'}`
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700'}`
          }
        >
          CONTACT
        </NavLink>
        <NavLink
          to='/medico'
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700'}`
          }
        >
          MED BRIDGE
        </NavLink>
        {token && userData && (
          <NavLink
            to='/my-orders'
            className={({ isActive }) =>
              `py-2 px-4 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700'}`
            }
          >
            MY ORDERS
          </NavLink>
        )}
      </ul>
        <Toaster position='top-center'/>
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt='User' />
            <img className='w-2.5' src={assets.dropdown_icon} alt='Dropdown' />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p
                  onClick={() => navigate('/my-profile')}
                  className='hover:text-black cursor-pointer'
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className='hover:text-black cursor-pointer'
                >
                  My Appointments
                </p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}

        <div className='relative'>
          <FaShoppingCart
            onClick={handleCartClick}
            className='w-6 h-6 cursor-pointer'
          />
          {cartItems.length > 0 && (
            <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5'>
              {cartItems.length}
            </span>
          )}
        </div>

        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden'
          src={assets.menu_icon}
          alt='Menu'
        />

        <div
          className={`${
            showMenu ? 'fixed w-full' : 'h-0 w-0'
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.new_logo} alt='MED BRIDGE Logo' />
            <img
              className='w-7'
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt='Close'
            />
          </div>

          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink
              onClick={() => setShowMenu(false)}
              to='/'
              className='px-4 py-2 rounded inline-block'
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to='/doctors'
              className='px-3 py-3 rounded inline-block'
            >
              ALL DOCTORS
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to='/about'
              className='px-3 py-3 rounded inline-block'
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to='/contact'
              className='px-3 py-3 rounded inline-block'
            >
              CONTACT
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to='/medico'
              className='px-3 py-3 rounded inline-block'
            >
              MED BRIDGE
            </NavLink>
            {token && userData && (
              <NavLink
                onClick={() => setShowMenu(false)}
                to='/my-orders'
                className='px-3 py-3 rounded inline-block'
              >
                MY ORDERS
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
