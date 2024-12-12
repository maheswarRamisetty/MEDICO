import express from 'express'
import { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/adminController.js'
import { changeAvailablity } from '../controllers/doctorController.js'
import upload from '../middlewares/multer.js'                                                                                                                                                                                                                                                                                                                                           
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailablity)
adminRouter.get('/apps',authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter