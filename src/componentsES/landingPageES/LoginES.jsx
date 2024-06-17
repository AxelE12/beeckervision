import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from "../../assets/Group 2119.png";
import PasswordModalES from '../modalES/PasswordModalES'
import DropdownIdiomasES from './DropdownIdiomasES'

const LoginES = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('https://fa2nw5yeu3.execute-api.us-east-1.amazonaws.com/v1/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            console.log('Response:', response);
    
            if (response.ok) {
                const data = await response.json(); // Leer el cuerpo de la respuesta como JSON
                if (data.message === 'Inicio de sesión exitoso') {
                    const { token } = data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('companyID', data.companyID);
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('companyName', data.companyName);
                    if(data.profilePic){
                        localStorage.setItem('profilePic', data.profilePic);
                    }else{
                        localStorage.setItem('profilePic', 'https://robohash.org/1x1');
                    }
                    window.location.reload();
                    navigate('/dashboard');
                } else {
                    console.error('Error en inicio de sesión:', data.message);
                    alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
                }
            } else {
                const errorMessage = await response.text();
                console.error('Error en inicio de sesión:', errorMessage);
                alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };
    
    
    const handleClose = () => setShowModal(false);

    return (
        <div className='flex flex-col max-w-lg max-h-screen bg-white px-16 py-8 rounded-lg'>
            <div className='flex justify-end mb-4'>
                <DropdownIdiomasES/>
            </div>
            <div className='flex flex-wrap items-center justify-center'>
                <div className='w-1/2 max-w-sm'>
                    <img src={Logo} alt='Logo' className='max-w-full h-auto'/>
                </div>
            </div>
            <div className='mt-4'>
                <p className='font-poppins font-semibold text-lg mt-4 text-[#555555] text-center mb-8'>
                    Ingrese a su cuenta
                </p>
            </div>
            <div>
                <label htmlFor={'emailES'} className='font-poppins font-normal text-lg text-[#555555]'>Correo
                    electrónico</label>
                <input
                id={'email'}
                autoComplete={'email'}
                type='email'
                className='font-poppins font-normal w-full rounded-lg p-4 mt-4 mb-4 bg-[#F0EFFF]'
                placeholder='work@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor={'passwordES'}
                       className='font-poppins font-normal text-lg text-[#555555]'>Contraseña</label>
                <input
                id={'password'}
                type='password'
                className='font-poppins font-normal w-full rounded-lg p-4 mt-4 mb-4 bg-[#F0EFFF]'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                onClick={handleLogin}
                className='hover:scale-[1.01] active:scale-[0.99] active:duration-75 transition-all ease-in-out
                        font-poppins bg-[#803FE0] rounded-lg py-4 text-white mb-4 mt-10'>Iniciar sesión
            </button>
            <div className="flex items-center justify-center mt-4 mb-4">
                <div className="w-full border-t border-[#C2C2C2]"></div>
                <span className="font-poppins font-semibold text-[#C2C2C2] mx-4">O</span>
                <div className="w-full border-t border-[#C2C2C2]"></div>
            </div>
            <button
                onClick={() => setShowModal(true)}
                className='hover:scale-[1.01] active:scale-[0.99] active:duration-75 transition-all ease-in-out
                        font-poppins border-2 border-[#6200D1] text-[#6200D1] rounded-lg py-4 mt-4'>Recuperar mi contraseña
            </button>
            {showModal && (
                <PasswordModalES onClose={handleClose}/>
            )}
        </div>
    );
}

export default LoginES;