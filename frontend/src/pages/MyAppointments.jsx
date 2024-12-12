import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import  toast  from 'react-hot-toast';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Spinner from '../components/Spinner';
const MyAppointments = () => {
  const stripePromise = loadStripe("pk_test_51Pk5VoBWGUK1juFbfQzAMX2ZtVDb2uwrvUMSHXsLBjS2P5BkMxjrjdiuNodF9U8gYwtoOzPNSneoWguEvI8WTHXI00jWnZfkC7");
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const makePayment = async (appointment) => {
    try {
      const line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: appointment.docData.name,
            },
            unit_amount: appointment.amount * 100,
          },
          quantity: 1,
        },
      ];

      const { data } = await axios.post(`${backendUrl}/api/user/payment/create-payment-intent`, { line_items });
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again later.");
    }
  };

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel appointment.");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return !appointment.cancelled;
    if (filter === "cancelled") return appointment.cancelled;
    return true;
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">My Appointments</h1>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium">Appointments</p>
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                className="w-32 h-32 object-cover rounded"
                src={item.docData.image}
                alt={item.docData.name}
              />

              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">
                  {item.docData.name}
                </p>
                <p className="text-gray-600">{item.docData.speciality}</p>
                <p className="mt-2">
                  <span className="font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
                <p className="mt-1">
                  <span className="font-medium">Address:</span> {item.docData.address.line1}, {item.docData.address.line2}
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-center">
                {!item.cancelled && (
                  <button
                    onClick={() => makePayment(item)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <span className="text-red-500 font-medium">Appointment Cancelled</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
