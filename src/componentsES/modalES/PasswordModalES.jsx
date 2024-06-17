import React, { useState } from 'react';
import BLogo from '../../assets/Beecker_Logo_Alta 1.png'
import Exit from '../../assets/reject.png'


const PasswordModalES = ({ onClose }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await fetch('https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/forgot-password/ES', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Mensaje de éxito
                onClose(); // Cerrar el modal después de enviar la solicitud
            } else {
                alert(data.message); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error('Error al solicitar recuperación de contraseña:', error);
            alert('Error al solicitar recuperación de contraseña. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center'>
            <div className='max-w-xl max-h-screen bg-white px-12 py-12 rounded-lg'>
                {/*Close button*/}
                <div className='flex justify-end mb-4'>
                    <button onClick={onClose}>
                        <img src={Exit} alt='Exit' className='w-8 h-8'/>
                    </button>
                </div>
                {/*Logo, form, etc*/}
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-2/3 max-w-sm'>
                        <img src={BLogo} alt='Logo' className='max-w-full h-auto'/>
                    </div>
                    <div className='flex flex-col text-center'>
                        <pre className='font-poppins font-semibold text-[#555555] mt-4 mb-4'>Encuentra tu cuenta</pre>
                        <pre className='font-poppins font-semibold text-[#555555] mb-4'>Por favor introduzca su correo electrónico</pre>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor={'emailForPassword'} className='font-poppins font-normal text-lg text-[#555555]'>Correo electrónico</label>
                        <input
                            id={'emailForPassword'}
                            autoComplete={'email'}
                            type='email'
                            className='font-poppins font-normal w-full rounded-lg p-4 mt-4 mb-4 bg-[#F0EFFF]'
                            placeholder='work@email.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                {/*Button*/}
                <div className='mt-4 flex flex-col gap-y-4'>
                    <button onClick={handleForgotPassword} className='hover:scale-[1.01] active:scale-[0.99] active:duration-75 transition-all ease-in-out
                    font-poppins bg-[#803FE0] rounded-lg py-4 text-white mb-4'>Siguiente</button>
                </div>
            </div>
        </div>
    );
}

export default PasswordModalES;
