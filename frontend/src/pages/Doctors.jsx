import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DoctorsPage = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    let filtered = doctors;

    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }

    if (searchQuery) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchQuery]);

  return (
    <div className="p-6">
        <div className="w-full mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for doctors..."
          className="w-full md:w-1/2 border-2 rounded-lg py-3 px-6 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:scale-105"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex">
        <div className="w-1/4 border-r pr-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-col gap-3">
            {[
              "General physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  speciality === cat
                    ? navigate("/doctors")
                    : navigate(`/doctors/${cat}`)
                }
                className={`text-left py-2 px-4 border rounded-lg ${
                  speciality === cat ? "bg-indigo-100 text-indigo-700" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="w-3/4 grid grid-cols-2 lg:grid-cols-3 gap-6 pl-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg cursor-pointer transition-shadow"
            >
              <img
                className="w-full h-50 object-cover rounded-lg mb-3"
                src={item.image}
                alt=""
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">{item.speciality}</p>
              <div className="text-green-500 mt-2">
                <span className="w-2 h-2 bg-green-500 inline-block rounded-full"></span>{" "}
                Available
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
