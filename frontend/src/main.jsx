import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import App from './App.jsx'
import './index.css'
import PaymentContextProvider from './context/PaymentContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <PaymentContextProvider>
      <App />
      </PaymentContextProvider>
    </AppContextProvider>
  </BrowserRouter>,
)
