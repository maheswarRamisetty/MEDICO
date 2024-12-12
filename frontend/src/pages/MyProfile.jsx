import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { notifySuccess, notifyError } from '../mahi/utils/NotifyHelp';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { token },
      });

      if (data.success) {
        notifySuccess('Profile Updated Successfully');
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        notifyError(data.message);
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <>
      <Toaster position="top-center" />
      {userData && (
        <div className="container mx-auto px-6 py-10 max-w-4xl">
          <div className="bg-gray-50 shadow-xl rounded-lg p-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">

              <label htmlFor="profileImage" className="relative group cursor-pointer">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-lg"
                />
                {isEdit && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold">Change Photo</span>
                  </div>
                )}
                <input type="file" id="profileImage" hidden onChange={handleImageChange} />
              </label>

   
              <div>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold border-b border-gray-400 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                )}
                <p className="text-gray-500">{userData.email}</p>
              </div>
            </div>


            <hr className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  {isEdit ? (
                    <input
                      type="text"
                      value={userData.phone}
                      onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-700">{userData.phone || 'N/A'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600">Address</label>
                  {isEdit ? (
                    <>
                      <input
                        type="text"
                        value={userData.address.line1}
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))
                        }
                        placeholder="Line 1"
                        className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 mb-2"
                      />
                      <input
                        type="text"
                        value={userData.address.line2}
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))
                        }
                        placeholder="Line 2"
                        className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      />
                    </>
                  ) : (
                    <p className="text-gray-700">
                      {userData.address.line1 || 'N/A'}
                      <br />
                      {userData.address.line2 || 'N/A'}
                    </p>
                  )}
                </div>
              </div>
            </div>

          
            <hr className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-600">Gender</label>
                  {isEdit ? (
                    <select
                      value={userData.gender}
                      onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <p className="text-gray-700">{userData.gender || 'N/A'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600">Birthday</label>
                  {isEdit ? (
                    <input
                      type="date"
                      value={userData.dob}
                      onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-700">{userData.dob || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              {isEdit ? (
                <>
                  <button
                    onClick={() => setIsEdit(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateUserProfileData}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
