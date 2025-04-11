import toast from 'react-hot-toast';

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error') => {
    toast(message, {
      className: `toast toast-${type}`,
      icon: type === 'success' ? '✅' : '❌',
    });
  };

  return { showToast };
};