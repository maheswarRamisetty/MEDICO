import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast,{Toaster}  from 'react-hot-toast';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  const notifyError = (message) => {
    toast.error(message, {
      style: {
        border: '1px solid #f44336',
        padding: '10px 15px',
        borderRadius: '8px',
        background: '#fff',
        color: '#333',
        fontWeight: '500',
        fontSize: '14px',
      },
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          notifySuccess('Registration Successful!');
          console.log("Register Success");
          setToken(data.token);
          setTimeout(() => {
            setLoading(false);
            setState('Login');
          }, 1000);
        } else {
          setLoading(false);
          notifyError(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          notifySuccess('Login Successful!');
          console.log("Login Success");
          setToken(data.token);
        } else {
          setLoading(false);
          notifyError(data.message);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      notifyError(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      )}
      <Toaster position='top-center'/>
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
          <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment</p>

          {state === 'Sign Up' && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} className="text-primary underline cursor-pointer">
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{' '}
              <span onClick={() => setState('Sign Up')} className="text-primary underline cursor-pointer">
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
