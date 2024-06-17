import React from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/Group 2119.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartPie, faToolbox, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const DefaultSidebarES = ({ active, onChange }) => {
    const navigate = useNavigate();
    const companyName = localStorage.getItem('companyName');

    const isClient = () => {
        if (companyName === 'Beecker') {
            return false;
        } else {
            return true;
        }
    }

    const setStatusOffline = async (userID) => {
        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/status/${userID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Offline' }),
            });
            
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = async() => {
        await setStatusOffline(localStorage.getItem('userID'));
        // Eliminar el token del almacenamiento local al cerrar sesión
        localStorage.clear();
        // Redirigir al usuario a la página de inicio
        navigate('/');
        window.location.reload();
    }

    const isActive = (componentName) => active === componentName ? 'bg-[#6200D1] text-white' : '';

    return (
        <div className='flex flex-col bg-white h-screen'>
            <div className='w-2/3 max-w-sm mt-6 mx-9'>
                <img src={Logo} alt="Beecker Logo" className='w-full rounded-lg '/>
                {!isClient() && (
                    <p className='font-poppins font-sm text-lg text-center'>Para Beecker</p>
                )}

                {isClient() && (
                    <p className='font-poppins font-sm text-lg text-center'>Para Clientes</p>
                )}
            </div>
            <div className='flex-1'>
                <p className='font-poppins font-medium text-lg mt-8 mx-4 mb-6'>Menú Principal</p>
                <button
                    onClick={() => onChange('ROI')}
                    className={`font-poppins text-md flex items-center w-full py-6 transition-all hover:bg-[#6200D1] hover:text-white ${isActive('ROI')}`}>
                    <FontAwesomeIcon icon={faHome} className='text-2xl mx-4'/>
                    <span className='mx-4'>Tablero</span>
                </button>
                <button
                    onClick={() => onChange('Metrics')}
                    className={`font-poppins text-md flex items-center w-full py-6 transition-all hover:bg-[#6200D1] hover:text-white ${isActive('Metrics')}`}>
                    <FontAwesomeIcon icon={faChartPie} className='text-2xl mx-4'/>
                    <span className='mx-4'>Métricas</span>
                </button>
                <button
                    onClick={() => onChange('Activity')}
                    className={`font-poppins text-md flex items-center w-full py-6 transition-all hover:bg-[#6200D1] hover:text-white ${isActive('Activity')}`}>
                    <FontAwesomeIcon icon={faEnvelope} className='text-2xl mx-4'/>
                    <span className='mx-4'>Actividad</span>
                </button>
                <p className='font-poppins font-medium text-lg mt-8 mx-4 mb-6'>Soporte</p>
                <button
                    onClick={() => onChange('ServiceDesk')}
                    className={`font-poppins text-md flex items-center w-full py-6 transition-all hover:bg-[#6200D1] hover:text-white ${isActive('ServiceDesk')}`}>
                    <FontAwesomeIcon icon={faToolbox} className='mx-4 text-2xl'/>
                    <span className='mx-4'>Mesa de Servicio</span>
                </button>
            </div>
            <button
                onClick={handleLogout}
                className='flex items-center w-full py-6 text-[#858796] text-lg font-semibold mt-auto
                transition-all hover:bg-[#DC143C] hover:text-white'>
                <FontAwesomeIcon icon={faSignOutAlt} className='mx-4 text-2xl'/>
                <span className='mx-4'>Cerrar Sesión</span>
            </button>
        </div>
    );
};

export default DefaultSidebarES;