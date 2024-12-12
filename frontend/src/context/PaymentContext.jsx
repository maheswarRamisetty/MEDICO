import React, { createContext, useState, useContext } from 'react';

export const PaymentContext = createContext();


const PaymentContextProvider = ( props) => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending'); 

  const startPayment = (details) => {
    setPaymentDetails(details);
    setPaymentStatus('pending');
  };

  const updatePaymentStatus = (status) => {
    setPaymentStatus(status); 
  };
  const value = {
    paymentDetails,
    setPaymentDetails,
    paymentStatus,
    setPaymentStatus,
    startPayment,
    updatePaymentStatus
  }
  return (
    <PaymentContext.Provider value={value}>
      {props.children}
    </PaymentContext.Provider>
  );
};


export default PaymentContextProvider;