import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';
import toast from 'react-hot-toast'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const notifyError = (message) => {
    toast.error(message, {
      style: {
        border: '1px solid #f44336',
        padding: '10px 15px',
        borderRadius: '8px',
        background: '#fff',
        color: '#333',
        fontWeight: '500',
        fontSize: '14px',
      },
    });
  };
  
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Patient</th>
              <th className="px-4 py-2 border">Date & Time</th>
              <th className="px-4 py-2 border">Doctor</th>
              <th className="px-4 py-2 border">Fees</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 text-gray-500">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border flex items-center gap-2">
                  <img className="w-8 rounded-full" src={item.userData.image} alt="" />
                  <span>{item.userData.name}</span>
                </td>
                <td className="px-4 py-2 border">{slotDateFormat(item.slotDate)}, {item.slotTime}</td>
                <td className="px-4 py-2 border flex items-center gap-2">
                  <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="" />
                  <span>{item.docData.name}</span>
                </td>
                <td className="px-4 py-2 border">{currency}{item.amount}</td>
                <td className="px-4 py-2 border text-center">
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                  ) : (
                    <div className='flex gap-2'>
                    <img src={assets.tick_icon} onClick={()=>notifyError("Currently this is Unavailable!")} className='ml-6 cursor-pointer w-10'/>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
