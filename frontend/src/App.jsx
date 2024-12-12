import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'
import Medico from './components/Medico'
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import Cart from './components/Cart'
import Payment from './components/Payment';
import SuccessPage from './components/SuccessPage';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[5%]'>
    <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/medico' element={<Medico/>} />
        <Route path='/api/v1/payment' element={<Payment/>} /> 
        <Route path='/payment/success' element={<SuccessPage/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App