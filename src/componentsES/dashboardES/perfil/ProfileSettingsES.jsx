import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSettingsES = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        company: localStorage.getItem('companyName'),
        position: localStorage.getItem('role'),
        avatar: localStorage.getItem('profilePic')
    });

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        handleFileUpload(e.target.files[0]);
    };

    const handleFileUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePic', file);

        const userId = localStorage.getItem('userID');

        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/users/${userId}/profile-pic`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                const newProfilePicUrl = result.profilePicURL; // Asegúrate de que esta es la key correcta del JSON de respuesta
                console.log('Profile picture updated successfully:', newProfilePicUrl);
                setUser((prevUser) => ({ ...prevUser, avatar: newProfilePicUrl }));
                localStorage.setItem('profilePic', newProfilePicUrl);
                window.location.reload();
            } else {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="rounded-lg bg-white h-fit flex flex-col p-8">
            <div className="flex items-center space-x-6 relative">
                <div className="group relative">
                    <img
                        className="h-24 w-24 rounded-full object-cover cursor-pointer"
                        src={user.avatar || 'default-avatar-url'}
                        alt={user.name}
                        onClick={() => document.getElementById('fileInput').click()}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => document.getElementById('fileInput').click()}>
                        <span className="text-white font-bold">Cambiar</span>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">{user.name}</h2>
                    <p className="text-xl text-gray-600">{user.position} en {user.company}</p>
                    <p className="text-lg text-gray-600">{user.email}</p>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-semibold">Configuración de Perfil</h3>
                <form className="mt-6 space-y-6">
                    <div>
                        <label className="block text-xl text-gray-900">Nombre</label>
                        <label className="block text-lg text-gray-600">{user.name}</label>
                    </div>
                    <div>
                        <label className="block text-xl text-gray-900">Correo Electrónico</label>
                        <label className="block text-lg text-gray-600">{user.email}</label>
                    </div>
                    <div>
                        <label className="block text-xl text-gray-900">Compañía</label>
                        <label className="block text-lg text-gray-600">{user.company}</label>
                    </div>
                    <div>
                        <label className="block text-xl text-gray-900">Posición</label>
                        <label className="block text-lg text-gray-600">{user.position}</label>
                    </div>
                    <div>
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg hidden"
                        />
                    </div>
                </form>
            </div>
            <div className="flex justify-end mt-6">
                <button
                    onClick={() => navigate(-2)}
                    className="hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out
                               bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md
                               hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ProfileSettingsES;
