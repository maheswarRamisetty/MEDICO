import { createContext ,useState} from "react";
import {toast} from 'react-toastify'
import axios from "axios";
import { assets } from "../assets/assets_admin/assets"
import { useActionState } from "react";


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {



  const backendUrl=import.meta.env.VITE_BACKEND_URL;
  const [dToken,setDToken]=useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
  const [appointments,setAppointments]=useState([])

  const [profileData,setProfile]=useState(false);


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
  const getProfile=async ()=>{
    try{
      const {data}=await axios.get(backendUrl+ '/api/doctor/profile',{headers:{dToken}})
      if(data.success){
        setProfile(data.profile);
        console.log(data.profile);
      }
      else{
        toast.error(data.message);
      }

    }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  const [dashData,setDashData]=useState(false);


  const getAppointments=async ()=>{
    try{
        const {data}=await axios.get(backendUrl + '/api/doctor/appoints',{ headers : { dToken } } )
        if(data.success){
          setAppointments(data.appointments.reverse());
          console.log(data.appointments.reverse());
        }else{
          toast.error(data.message);
        }
    }catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }


  const getDashDataForDoctor = async () =>{
    try{

      const {data}=await axios.get(backendUrl+ '/api/doctor/dashboard',{headers:{dToken}})
      if(data.success){
        setDashData(data.dub)
        console.log(data.dub);
      }
      else{
        console.log(data.message)
        toast.error(data.message);
      }

    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  const completeAppointment=async (appointmentId)=>{
    try{
      const {data} = await axios.post(backendUrl+ '/api/doctor/complete-app',{appointmentId},{headers:{dToken}});
      if(data.success){
        notifySuccess("Appointment Success!");
        getAppointments();

      }else{
        notifyError("Something Went Wrong!");
      }
    }catch(error){
      console.log(error.message);
      notifyError("Something Went Wrong");
    }
  }

  
  const cancelAppointment=async (appointmentId)=>{
    try{
      const {data} = await axios.post(backendUrl+ '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}});
      if(data.success){
        notifySuccess("Appointment Cancelled!")
        getAppointments();

      }else{
        notifyError("Something Went Wrong!")
        console.log(data.message);
      }
    }catch(error){
      console.log(error.message);
    }
  }


  const value = {
    dToken,setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    cancelAppointment,
    dashData,setDashData,
    getDashDataForDoctor,
    completeAppointment,
    profileData,setProfile,
    getProfile,
  }

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider