import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const endpoint =
        state === 'Admin' ? '/api/admin/login' : '/api/doctor/login'
      const { data } = await axios.post(backendUrl + endpoint, { email, password })

      if (data.success) {
        const tokenKey = state === 'Admin' ? 'aToken' : 'dToken'
        localStorage.setItem(tokenKey, data.token)
        state === 'Admin' ? setAToken(data.token) : setDToken(data.token)
        console.log(`${state} Token:`, data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went wrong!')
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStateToggle = () => {
    setState((prevState) => (prevState === 'Admin' ? 'Doctor' : 'Admin'))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="transition-all duration-500 transform"
        style={{
          opacity: isLoading ? 0.5 : 1,
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-5 items-center bg-white p-8 shadow-lg rounded-lg min-w-[340px] sm:min-w-96"
        >
          <p className="text-2xl font-semibold">
            <span className="text-primary">{state}</span> Login
          </p>
          <div className="w-full">
            <label className="block text-gray-600 text-sm">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              className="w-full border rounded p-2 mt-1 focus:outline-primary"
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-600 text-sm">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              className="w-full border rounded p-2 mt-1 focus:outline-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg transition-transform transform hover:scale-105"
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          <p className="text-sm">
            {state === 'Admin' ? (
              <>
                Doctor Login?{' '}
                <span
                  onClick={handleStateToggle}
                  className="text-primary underline cursor-pointer"
                >
                  Click Here
                </span>
              </>
            ) : (
              <>
                Admin Login?{' '}
                <span
                  onClick={handleStateToggle}
                  className="text-primary underline cursor-pointer"
                >
                  Click Here
                </span>
              </>
            )}
          </p>
        </form>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}

export default Login
