import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import StatusDot from '../../../components/dashboard/profile/StatusDot';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const DefaultNavbarES = ({ toggleSidebar, onSettingsClick, onCompanyClick }) => {
    const userName = localStorage.getItem('username');
    const userID = localStorage.getItem('userID'); // Assuming userID is stored in localStorage
    const userPosition = localStorage.getItem('role');
    const [status, setStatus] = useState(localStorage.getItem('status') || 'online');
    const [notifications, setNotifications] = useState([
        'Notificación 1',
        'Notificación 2',
        'Notificación 3'
    ]); // Replace with your notifications logic
    const navigate = useNavigate();

    const changeLanguage = (lang) => {
        if (lang === 'EN') {
            navigate('/dashboard');
        } else {
            navigate('/dashboard/ES');
        }
    };

    const changeStatus = async (newStatus) => {
        setStatus(newStatus);
        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/status/${userID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            localStorage.setItem('status', newStatus);

            if (!response.ok) {
                console.error('Failed to update status:', await response.text());
            }
        } catch (error) {
            console.error('An error occurred while updating the status:', error);
        }
    };

    const removeNotification = (index, e) => {
        e.stopPropagation();
        setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
    };

    const companyName = localStorage.getItem('companyName');

    return (
        <div className='flex items-center justify-between bg-white h-32 px-4 lg:px-8 border-b-2'>
            <div className='lg:hidden'>
                <button onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} className='text-2xl' />
                </button>
            </div>

            <div className='flex-grow lg:flex-grow-0'>
                <h2 className="text-center font-poppins font-semibold text-xl bg-clip-text text-transparent mt-2"
                    onClick={onCompanyClick}
                    style={{
                        backgroundImage: 'linear-gradient(to right, #E3494D 25%, #6200D1 55%, #6310C0 75%)',
                        fontSize: 'clamp(0.9rem, 3vw, 2rem)'
                    }}>
                    {companyName}
                </h2>
            </div>
            <div className='relative flex items-center space-x-4'>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#F0EFFF] px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            ES
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => changeLanguage('EN')}
                                            className={classNames(
                                                'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            EN
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="text-gray-700 hover:text-gray-900 focus:outline-none relative">
                            <FontAwesomeIcon icon={faBell} className='text-2xl' />
                            {notifications.length > 0 && (
                                <span className='absolute top-0 right-0 inline-block w-2.5 h-2.5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full'></span>
                            )}
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {notifications.map((notification, index) => (
                                    <Menu.Item key={index}>
                                        {({ active }) => (
                                            <div className="flex justify-between items-center px-4 py-2 text-sm">
                                                <span className="text-gray-700 flex-1">
                                                    {notification}
                                                </span>
                                                <button
                                                    onClick={(e) => removeNotification(index, e)}
                                                    className="text-gray-500 ml-2"
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className='text-sm' />
                                                </button>
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="flex items-center gap-x-2 focus:outline-none">
                            <div className='relative w-10 h-10'>
                                <img src={localStorage.getItem('profilePic')} alt="Perfil"
                                     className="rounded-full w-full h-full"/>
                                <StatusDot status={status}/>
                            </div>
                            <div className="text-left">
                                <span className="font-poppins font-semibold text-gray-900 block">{userName}</span>
                                <span className="text-gray-500 text-sm block">{userPosition}</span>
                            </div>
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => changeStatus('online')}
                                            className={classNames(
                                                'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            En línea
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => changeStatus('away')}
                                            className={classNames(
                                                'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            Ausente
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => changeStatus('busy')}
                                            className={classNames(
                                                'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            Ocupado
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => changeStatus('offline')}
                                            className={classNames(
                                                'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            Desconectado
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={onSettingsClick}
                                            className={classNames(
                                                'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm flex items-center space-x-2'
                                            )}
                                        >
                                            <FontAwesomeIcon icon={faCog} className='text-gray-600' />
                                            <span>Configuración</span>
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};

export default DefaultNavbarES;
