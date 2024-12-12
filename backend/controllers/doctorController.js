import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"


const changeAvailablity = async (req, res) => {

  try {

    const { docId } = req.body
    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
    res.json({ success: true, message: 'Availablity Changed ' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

const doctorList = async (req, res) => {

  try {

    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

const appointmentDoctor =async  (req,res)=>{
  try{

    const { docId }=req.body;
    const appointments=await appointmentModel.find({ docId });
    res.json( { success:true,appointments} );

  }
  catch(error){
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}



const appointMentComplete= async (req,res)=>{
  try{
    const {docId,appointmentId}=req.body;
    const appointmentData=await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
      return res.json({success:true,message:'Appointment Completed'});

    }
    else{
      return res.json({success:false,message:'Success Failed'})
    }
    
  }catch(error){
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}




const appointMentCancel= async (req,res)=>{
  try{
    const {docId,appointmentId}=req.body;
    const appointmentData=await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId===docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
      return res.json({success:true,message:'Appointment Cancelled'});

    }
    else{
      return res.json({success:false,message:'Cancellation Failed'})
    }
    
  }catch(error){
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const doctorDash =async  (req,res) => {
  try{

    const {docId} = req.body;

    const appointments= await appointmentModel.find({docId});

    let profit = 0;
    appointments.map((item)=>{
      if(item.isCompleted || item.payment){
        profit+=item.amount
      }

    })




    let patients=[]



    appointments.map((item)=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId)
      }

    })

    console.log(patients)


    const dub={
      profit,
      appointments:appointments.length,
      patients:patients.length,
      latest:appointments.reverse().slice(0,5),

    }

    console.log(dub)

    res.json({success:true,dub})

  }catch(error){
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const doctorProfile = async (req,res)=>{
  try{
    const {docId}=req.body;
    const profile = await doctorModel.findById(docId).select("-password");
    res.json({success:true,profile})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message});
  }
}


const doctorLogin=async (req,res) => {
  try{
    const { email, password } = req.body
    const user = await doctorModel.findOne({ email })
  
      if (!user) {
        return res.json({ success: false, message: 'User does not exist' })
      }
  
      const isMatch = await bcrypt.compare(password, user.password)
  
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
      } else {
        res.json({ success: false, message: 'Invalid Credentials' })
      }
  
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
}


const updateProfile=async (req,res)=>{
  try{
    const {docId,fees,address,available}=req.body;
    await doctorModel.findByIdAndUpdate(docId,{fees,address,available});
    res.json({success:true,message:"Profile Updated"})
  }
  catch(error){
    console.log(error.message);
    res.json({success:false,message:error.message})
  }
}

export {updateProfile,changeAvailablity,doctorProfile, doctorList ,doctorLogin,appointmentDoctor,appointMentComplete,appointMentCancel,doctorDash}