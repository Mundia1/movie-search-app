import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
  </>
);