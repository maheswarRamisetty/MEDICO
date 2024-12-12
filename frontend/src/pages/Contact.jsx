import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Contact <span className="text-blue-600">Us</span></h1>
        <p className="mt-3 text-gray-600 text-lg">We'd love to hear from you! Reach out to us with any inquiries.</p>
      </div>

    
      <div className="container mx-auto px-4 md:px-10 lg:px-20 flex flex-col md:flex-row items-center gap-10">
        
        <div className="w-full md:w-1/2">
          <img
            className="rounded-lg shadow-lg w-full object-cover"
            src={assets.contact_image}
            alt="Contact Us"
          />
        </div>

      
        <div className="w-full md:w-1/2 flex flex-col gap-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Our Office</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Tel: (415) 555 0132 <br />
              Email: <a href="mailto:vnmaheshwar@gmail.com" className="text-blue-600 hover:underline">fdjkluhkjfdjk@gmail.com</a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">Careers at MEDICO</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Learn more about our teams and job openings.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
