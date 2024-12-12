import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 


const Dashboard = () => {
  const { aToken, cancelAppointment, dashData, getDashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return <p>Loading dashboard data...</p>;
  }

  const pieData = {
    labels: ['Doctors', 'Appointments', 'Patients'],
    datasets: [
      {
        data: [dashData.doctors, dashData.appointments, dashData.patients],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EBCC', '#FF6384CC', '#FFCE56CC']
      }
    ]
  };

  const barData = {
    labels: dashData.lastestAppointments.map(item => item.docData.name),
    datasets: [
      {
        label: 'Latest Bookings',
        data: dashData.lastestAppointments.map(item => (item.cancelled ? 0 : 1)),
        backgroundColor: '#36A2EB'
      }
    ]
  };

  return (
    <div className='m-5 w-full'>
      <div className='flex flex-wrap gap-40'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

      </div>

      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
        <div className='bg-white p-4 rounded shadow'>
          <h3 className='text-center text-lg font-semibold'>Proportions (Pie Chart)</h3>
          <Pie data={pieData} />
        </div>

        <div className='bg-white p-4 rounded shadow'>
          <h3 className='text-center text-lg font-semibold'>Latest Bookings (Bar Graph)</h3>
          <Bar data={barData} />
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.lastestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
