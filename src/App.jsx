import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneOtpLogin from './components/PhoneOtpLogin';

export default function App() {
  return (
    <>
      <div className="text-center mt-16 h-screen">
        <h1 className="text-2xl font-semibold my-10">OTP Verification</h1>
        <PhoneOtpLogin />
      </div>
      <ToastContainer />
    </>
  );
}
