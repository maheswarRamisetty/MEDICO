import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { motion } from "framer-motion";
import {assets} from '../assets/assets_frontend/assets'
import { Typewriter } from "react-simple-typewriter";
import SearchBar from './SearchBar'
import ChatBot from './ChatBot'

const Home = () => {
   const sections = [
    { id: "home", title: "Explore", text:"Stay at Home. Consult Doctors Online" },
    { id: "services", title: "Our Services", image: "https://via.placeholder.com/1920x1080?text=Our+Services" },
    { id: "doctors", title: "Meet Our Doctors", image: "https://via.placeholder.com/1920x1080?text=Our+Doctors" },
    { id: "appointment", title: "Book Appointment", image: "https://via.placeholder.com/1920x1080?text=Book+Appointment" },
  ];
  return (
    <div>
      <br/>
      <br/>
      <div className="typewriter-container">
    </div>
      <div>
        <div>
          <motion.div
            id="mahesh"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 0.8 }}
            className='relative w-full h-[400px] flex items-center justify-center'>
            <h1>
        <span style={{ color: "blue", fontWeight: "bold",fontSize:"50px"}}>
          <Typewriter
            words={["Stay at Home.", "Consult Doctors Online.", "Book Your Appointment Now!"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h1>
            {/* <img src={assets.background} className='w-full h-full object-cover'></img> */}
          </motion.div>
          </div>
          <div>
          <SearchBar/>
          </div>
      </div>
      <br/>
      <br/>
      <ChatBot />

      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home