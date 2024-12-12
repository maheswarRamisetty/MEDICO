import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className='min-h-screen w-64 bg-gray-800 text-white border-r'>
      {aToken && (
        <ul className='mt-5'>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            to={'/admin-dashboard'}
          >
            <img src={assets.home_icon} alt='' className='w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            to={'/all-appointments'}
          >
            <img src={assets.appointment_icon} alt='' className='w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            to={'/add-doctor'}
          >
            <img src={assets.add_icon} alt='' className='w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            to={'/doctor-list'}
          >
            <img src={assets.people_icon} alt='' className='w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className='mt-5'>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            to={'/doctor-dash'}
          >
            <img src={assets.home_icon} alt='' className='w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            to={'/doctor-aps'}
          >
            <img src={assets.appointment_icon} alt='' className='w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            to={'/you-profile'}
          >
            <img src={assets.people_icon} alt='' className='w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' />
            <p>Profile</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            to={'/revenue'}
          >
            <img src={assets.revenue_icon} alt='' className='w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' />
            <p>Revenue</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
