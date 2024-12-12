import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const About = () => {
  return (
    <div className="bg-gray-50 pb-20">
      <div className="text-center py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <h1 className="text-3xl font-bold">ABOUT <span className="text-yellow-300">US</span></h1>
        <p className="mt-2 text-lg">Empowering Healthcare with Innovation</p>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 py-16 px-6 md:px-12">
        <img 
          className="w-full md:w-1/3 rounded-lg shadow-lg" 
          src={assets.about_image} 
          alt="About Us"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/3 text-gray-700">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-blue-600">Medico</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-lg leading-relaxed">
            Medico is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <h2 className="text-xl font-semibold text-blue-600">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            Our vision at Medico is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-700">WHY <span className="text-blue-600">CHOOSE US</span></h2>
        </div>

        <div className="container mx-auto flex flex-col md:flex-row gap-6 px-6 md:px-12">
          <div className="flex-1 border rounded-lg shadow-sm p-8 text-center transition-transform transform hover:scale-105 bg-white">
            <h3 className="text-xl font-semibold text-blue-600">Efficiency</h3>
            <p className="mt-4 text-gray-600">
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>

          <div className="flex-1 border rounded-lg shadow-sm p-8 text-center transition-transform transform hover:scale-105 bg-white">
            <h3 className="text-xl font-semibold text-blue-600">Convenience</h3>
            <p className="mt-4 text-gray-600">
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          <div className="flex-1 border rounded-lg shadow-sm p-8 text-center transition-transform transform hover:scale-105 bg-white">
            <h3 className="text-xl font-semibold text-blue-600">Personalization</h3>
            <p className="mt-4 text-gray-600">
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
