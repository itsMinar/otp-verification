import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function OtpInput({ length = 4, onOtpSubmit = () => {} }) {
  const [otp, setOtp] = useState(new Array(length).fill(''));

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[newOtp.indexOf('')]) {
      inputRefs.current[newOtp.indexOf('')].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional validation
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf('')].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const combinedOtp = otp.join('');
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    } else {
      toast.warn('Fill All the Fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center gap-2 my-4">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="text-black w-12 h-12 border text-center text-lg rounded border-blue-400"
          />
        ))}
      </div>

      <div>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
