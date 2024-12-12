import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast'
import Spinner from "../components/Spinner";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate=useNavigate();
  const currencySymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log("Backend",backendUrl);

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const [userData, setUserData] = useState(false);


  const [cartItems, setCartItems] = useState(() => {
   
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });


  const buyNow = () => {
    if (token) {
      navigate("/api/v1/payment");
    } else {
      toast.error("Please log in to continue with the purchase.");
      navigate('/login');                                                                                                                           
    }
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

 
  const notifySuccess = (message) => {
    toast.success(message, {
      style: {
        border: '1px solid #4caf50',
        padding: '10px 15px',
        borderRadius: '8px',
        background: '#fff',
        color: '#333',
        fontWeight: '500',
        fontSize: '14px',
      },
    });
  };


  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((cartItem) => cartItem._id === item._id);
  
      if (itemIndex !== -1) {
        const updatedItems = prevItems.map((cartItem, index) =>
          index === itemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        return updatedItems;
      }
  
      return [...prevItems, { ...item, quantity: 1 }];
    });
  
    notifySuccess("Item Added to Cart Successfully!");
  };
  
  

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem._id !== itemId));
    toast.success('Item removed from cart!');
  };

  const clearCart = () => {
    setCartItems([]);
    notifySuccess("Cart Cleared!")
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);


  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      <Spinner/>
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    buyNow
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
