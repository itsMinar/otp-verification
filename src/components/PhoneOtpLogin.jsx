import { useState } from 'react';
import { toast } from 'react-toastify';
import OtpInput from './OtpInput';

const OTP_SIZE = 4;

export default function PhoneOtpLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    // phone number validation
    if (!phoneNumber) {
      toast.warning('Please fill the phone number');
      return;
    }

    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      toast.warning('Invalid phone Number');
      return;
    }

    /* if you have any Backend then call the Backend API here */

    // dummy data (cause here I don't use any Backend API)
    const randomOTP = generateRandomOTPNumber(OTP_SIZE);
    toast.info(`Your OTP Code is: ${randomOTP}`, {
      position: 'bottom-right',
    });
    setGeneratedOtp(randomOTP);

    // show OTP Submit field
    setShowOtpInput(true);
  };

  const onOtpSubmit = (otp) => {
    if (generatedOtp === Number(otp)) {
      toast.success('Login Success!');
    } else {
      toast.error('Wrong OTP!');
    }
  };

  // This function is to generate a random OTP with a specific size (used ChatGPT)
  function generateRandomOTPNumber(size) {
    // Ensure the input is a positive integer
    const digits = Math.floor(Math.abs(size));

    if (digits === 0) {
      return 0; // Special case for generating a 0-digit number
    }

    // Calculate the range for the random number based on the number of digits
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    // Generate a random number within the specified range
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      {!showOtpInput ? (
        <form
          onSubmit={handlePhoneSubmit}
          className="flex items-center gap-4 justify-center text-xl"
        >
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            className="border p-2 rounded-lg text-black"
            placeholder="Enter phone number"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-500 hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-lg font-semibold">
            Enter OTP sent to {phoneNumber}
          </h2>
          <OtpInput length={OTP_SIZE} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
}
