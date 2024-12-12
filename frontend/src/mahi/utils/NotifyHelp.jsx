import { toast } from 'react-toastify';

export const notifySuccess = (message) => {
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


export const notifyError = (message) => {
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
