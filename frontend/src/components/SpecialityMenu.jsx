import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <section className="bg-gray-50 py-16" id="speciality">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-800">Find by Speciality</h1>
        <p className="mt-4 text-gray-600 text-sm sm:w-2/3 mx-auto">
          Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
        </p>
      </div>

    
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-full border border-gray-200"
              src={item.image}
              alt={item.speciality}
            />
            <p className="text-sm font-medium text-gray-700">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
