import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AppContext } from '../context/AppContext';

const Dpro = () => {

    const {dToken,profileData,getProfile,setProfile}=useContext(DoctorContext);
    const {currency,backendUrl}=useContext(AppContext);


    useEffect(()=>{
        if(dToken){
            getProfile();
        }
    },[dToken])

  return (
    profileData && (
    <div>

       <img src={profileData.image}></img>

       <p>{profileData.name}</p>

      
    </div>
    )
  )
}

export default Dpro
