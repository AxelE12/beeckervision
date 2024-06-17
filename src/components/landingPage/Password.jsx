import React, { useState } from 'react';
import Logo from "../../assets/Group 2119.png";
import BLogo from "../../assets/Beecker_Logo_Alta 1.png";
import { useNavigate, useParams } from "react-router-dom";

const Password = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { email, token } = useParams();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
    setShowSuccessMessage(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
    setShowSuccessMessage(false);
  };

  const validatePassword = () => {
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+]/;
  
    if (password.length < 8) {
      setPasswordError('The password must be at least 8 characters long.');
      return false;
    } else if (!uppercaseRegex.test(password)) {
      setPasswordError('The password must contain at least one uppercase letter.');
      return false;
    } else if (!digitRegex.test(password)) {
      setPasswordError('The password must contain at least one digit.');
      return false;
    } else if (!specialCharRegex.test(password)) {
      setPasswordError('The password must contain at least one special character.');
      return false;
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return false;
    }
    
    return true;
  };

  const handleNextClick = async () => {
    if (validatePassword()) {
      try {
        const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/reset-password/${email}/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Password successfully reset'); // Mensaje de éxito
          localStorage.removeItem('token'); // Borra el token del localStorage
          navigate('/');
        } else {
          alert(data.message); // Mostrar mensaje de error desde la respuesta
        }
      } catch (error) {
        console.error('Error al solicitar recuperación de contraseña:', error);
        alert('Error al solicitar recuperación de contraseña. Por favor, inténtalo de nuevo.');
      }
    }
  };
  

  return (
    <div className='flex w-full h-screen'>
      <div className='hidden lg:flex h-full w-1/2 items-center justify-center'>
        <div className='flex w-2/3 max-w-sm justify-center items-center'>
          <img src={Logo} alt='logo' className='max-w-full h-autoß' />
        </div>
      </div>
      <div className='w-full flex items-center justify-center lg:w-1/2 min-h-screen'>
        <div className='flex flex-col max-w-lg max-h-screen bg-white px-16 py-16 rounded-lg'>
          <div className='flex flex-wrap items-center justify-center'>
            <div className='w-2/3 max-w-sm'>
              <img src={BLogo} alt='Logo' className='max-w-full h-auto' />
            </div>
          </div>
          <div className='mt-4'>
            <p className='font-poppins font-semibold text-lg mt-4 text-[#555555] text-center mb-8'>
              Reset password
            </p>
          </div>
          <div>
            <label htmlFor={'password'} className='font-poppins font-normal text-lg text-[#555555]'>New password</label>
            <input
              id={'password'}
              type='password'
              value={password}
              onChange={handlePasswordChange}
              className='font-poppins font-normal w-full rounded-lg p-4 mt-4 mb-4 bg-[#F0EFFF]'
              placeholder='Enter your new password'
            />
          </div>
          <div>
            <label htmlFor={'confirmPassword'} className='font-poppins font-normal text-lg text-[#555555]'>Repeat new password</label>
            <input
              id={'confirmPassword'}
              type='password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className='font-poppins font-normal w-full rounded-lg p-4 mt-4 mb-4 bg-[#F0EFFF]'
              placeholder='Enter your password again'
            />
          </div>
          <button
            onClick={handleNextClick}
            className='hover:scale-[1.01] active:scale-[0.99] active:duration-75 transition-all ease-in-out font-poppins bg-[#803FE0] rounded-lg py-4 text-white mb-4 mt-10'>Next
          </button>
          {passwordError && (
            <p className="font-poppins text-red-500 text-sm">{passwordError}</p>
          )}
          {showSuccessMessage && (
            <p className="font-poppins text-green-500 text-sm">Password successfully reset</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Password;
