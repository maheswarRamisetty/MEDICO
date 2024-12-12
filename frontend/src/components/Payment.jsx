import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect } from 'react';
import { PaymentContext } from '../context/PaymentContext';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast,{Toaster} from 'react-hot-toast'

const PaymentPage = () => {
  const stripePromise=loadStripe("pk_test_51Pk5VoBWGUK1juFbfQzAMX2ZtVDb2uwrvUMSHXsLBjS2P5BkMxjrjdiuNodF9U8gYwtoOzPNSneoWguEvI8WTHXI00jWnZfkC7")
  const { paymentDetails, paymentStatus, startPayment, updatePaymentStatus } = useContext(PaymentContext);                          
  const {backendUrl,token}=useContext(AppContext);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl+'/api/product/products');
      if (response.data.success) {
        setProducts(response.data.products); 
      } else {
        console.log(response.data);
        console.error('Failed to fetch products:', response.data.message);
        toast.error("Something Went Wrong!");
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    } finally {
      setLoading(false);
    }
  };
  const products = fetchProducts()
  useEffect(() => {
    if (!products && !token) {
      toast.error("No payment details available!");
      navigate('/cart'); 
    }
  }, [paymentDetails, navigate]);
  
  const handlePayment = async () => {
    console.log(products);
    try {

    const line_items=products.map((item)=>{
        return {
          price_data:{
            currency:"usd",
            product_data:{
              name:item.name
            },
            unit_amount:item.price*100
          },
          quantity:item.quantity
        }
      })
  
      const {data}=await  axios.post('http://localhost:4000/api/user/payment/create-payment-intent', {line_items});
  
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({sessionId:data.id})
     
      updatePaymentStatus('completed');
      toast.success("Payment successful!");
      navigate('/payment/success');
    } catch (error) {
      updatePaymentStatus('failed');
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Payment Details</h2>
        <p><strong>Amount:</strong> ${paymentDetails?.amount}</p>
        <p><strong>Items:</strong> {paymentDetails?.items.join(", ")}</p>
      </div>

      <div className="mt-4">
        {paymentStatus === 'pending' ? (
          <button
            onClick={handlePayment}
            className="bg-primary text-white px-6 py-3 rounded-full"
          >
            Proceed to Payment
          </button>
        ) : paymentStatus === 'completed' ? (
          <p className="text-green-500">Payment Successful!</p>
        ) : (
          <p className="text-red-500">Payment Failed. Try again.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
