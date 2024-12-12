import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_admin/assets'

const Dappnts = () => {
  const { dToken, appointments, getAppointments,cancelAppointment,completeAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      console.log("Called appointments");
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 border">#</th>
              <th className="py-3 px-6 border">Patient</th>
              <th className="py-3 px-6 border">Date </th>
              <th className="py-3 px-6 border">Doctor</th>
              <th className="py-3 px-6 border">Payment</th>
              <th className="py-3 px-6 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-6 border text-center">{index + 1}</td>
                <td className="py-3 px-6 border flex items-center gap-2">
                  <img className="w-8 rounded-full" src={item.userData.image} alt="" />
                  {item.userData.name}
                </td>
                <td className="py-3 px-6 border text-center">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </td>
                <td className="py-3 px-6 border flex items-center gap-2">
                  <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="" />
                  {item.docData.name}
                </td>
                <td className="py-3 px-6 border text-center">{item.payment?"ONLINE":"CASH"}</td>
                <td className="py-3 px-6 border text-center">
                    {

                        item.cancelled?<p>Cancel</p>:
                        item.isCompleted?<p>Complete</p>:
                        <div className='flex'>
                 <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon}/>
                 <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer'  src={assets.cancel_icon}  />
                 </div>
                    }
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dappnts;
