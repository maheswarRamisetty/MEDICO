import express from 'express'
import { appointMentComplete, doctorDash, doctorList, doctorLogin, doctorProfile, updateProfile } from '../controllers/doctorController.js'
import DocAuth from '../middlewares/DocAuth.js'
import { appointmentDoctor } from '../controllers/doctorController.js'
import { appointmentCancel } from '../controllers/adminController.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/appoints',DocAuth,appointmentDoctor)
doctorRouter.post('/cancel-appointment',DocAuth,appointmentCancel)
doctorRouter.post('/complete-app',DocAuth,appointMentComplete)
doctorRouter.get('/dashboard',DocAuth,doctorDash);
doctorRouter.post('/update',DocAuth,updateProfile);
doctorRouter.get('/profile',DocAuth,doctorProfile);
// doctorRouter.post('/complete-app/token-nil',appointMentCompleteTokenLess);

export default doctorRouter