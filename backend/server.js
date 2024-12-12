import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import requestLogger from './mahi/utils/requestLogger.js'


import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)


app.get('/', (req, res) => {
  res.send('Api working...: status Runnign')
})

app.listen(port, () => console.log('Server started at :', port)) 