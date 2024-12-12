import React, { useContext } from 'react'
import Login from './pages/Login'
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DDash from './Doctor/DDash';
import Dappnts from './Doctor/Dappnts';
import Dpro from './Doctor/Dpro';
import Revenue from './Doctor/Revenue';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken }= useContext(DoctorContext);


  return aToken || dToken ? (
    <div className='bg-[#f8f9fd]'>
      <Toaster/>
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>

  

          <Route path='/' element={<></>} />
          <Route path='admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
        
          <Route path='/doctor-dash' element={<DDash/>} />
          <Route path='/doctor-aps' element={<Dappnts/>}  />
          <Route path='/you-profile' element={<Dpro/>}  />
          <Route path='/revenue' element={<Revenue/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
    </>
  )
}

export default App