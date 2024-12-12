import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useContext } from "react";
import { DoctorContext } from "./DoctorContext";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)
  // const {dToken}=useContext(DoctorContext);

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const notifySuccess = (message) => {
    toast.success(message, {
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

  const getAllDoctors = async () => {

    try {

      const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
      if (data.success) {
        setDoctors(data.doctors)
        console.log(data.doctors)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeAvailability = async (docId) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        getAllDoctors()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const getAllAppointments = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/admin/apps', { headers: { aToken } })

      if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments)
      } else {
        console.log(data.message);
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

      if (data.success) {
        notifySuccess("Appointment Cancelled")
        getAllAppointments()
      } else {
        notifyError("Something went wrong!")
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const getDashData = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

      if (data.success) {
        setDashData(data.dashData)
        console.log(data.dashData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(data.message)
    }

  }

  const value = {
    aToken, setAToken,
    backendUrl,
    doctors, getAllDoctors,
    changeAvailability,
    appointments, setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData, getDashData,

  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider