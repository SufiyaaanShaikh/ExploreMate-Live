import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const OTPModal = ({ 
  isOpen, 
  onClose, 
  email, 
  onSuccess, 
  onResendOTP 
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer effect
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '']);
      setTimeLeft(120);
      setCanResend(false);
      setLoading(false);
      setResendLoading(false);
      // Focus first input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return; // Prevent multiple digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'Enter') {
      handleVerifyOTP();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    const otpArray = pastedData.split('').slice(0, 4);
    
    // Fill remaining with empty strings
    while (otpArray.length < 4) {
      otpArray.push('');
    }
    
    setOtp(otpArray);
    
    // Focus last filled input or first empty
    const lastFilledIndex = otpArray.findIndex(digit => !digit);
    const focusIndex = lastFilledIndex === -1 ? 3 : lastFilledIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 4) {
      toast.error('Please enter complete OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5017/api/auth/verify-otp-signup',
        {
          email,
          otp: otpString,
        },
        { timeout: 15000 }
      );

      if (response.status === 201) {
        toast.success('Email verified successfully!');
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error(
        error.response?.data?.message || 'OTP verification failed'
      );
      
      // Clear OTP on error
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);

    try {
      await onResendOTP();
      setTimeLeft(120);
      setCanResend(false);
      setOtp(['', '', '', '']);
      toast.success('New OTP sent successfully!');
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal-content">
        <div className="otp-modal-header">
          <h2>Verify Your Email</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="otp-modal-body">
          <p className="otp-instruction">
            We've sent a 4-digit verification code to:
          </p>
          <p className="email-display">{email}</p>
          
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="otp-input"
                disabled={loading}
              />
            ))}
          </div>

          <div className="timer-container">
            {timeLeft > 0 ? (
              <p className="timer-text">
                Code expires in: <span className="timer">{formatTime(timeLeft)}</span>
              </p>
            ) : (
              <p className="expired-text">Code has expired</p>
            )}
          </div>

          <div className="otp-actions">
            <button
              className="verify-btn"
              onClick={handleVerifyOTP}
              disabled={loading || otp.join('').length !== 4}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              className="resend-btn"
              onClick={handleResendOTP}
              disabled={!canResend || resendLoading}
            >
              {resendLoading ? 'Sending...' : 'Resend OTP'}
            </button>
          </div>

          <p className="help-text">
            Didn't receive the code? Check your spam folder or click resend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;