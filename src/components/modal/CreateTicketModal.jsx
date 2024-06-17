import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Logo from "../../assets/Group 2119.png";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const CreateTicketModal = ({ onClose, onCreateTicket }) => {
    const [subject, setSubject] = useState('');
    const [problem_type, setProblem_type] = useState('');
    const [priority_level, setPriority_level] = useState('Medium');
    const [description, setDescription] = useState('');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const created_at = `${year}-${month}-${day}`;  
    const [file, setFile] = useState(null);
    const [fileAttached, setFileAttached] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileAttached(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('problem_type', problem_type);
        formData.append('priority_level', priority_level);
        formData.append('description', description);
        formData.append('created_at', created_at);
        formData.append('created_by', localStorage.getItem('email'));
        formData.append('company_name', localStorage.getItem('companyName'));
        formData.append('file', file);

        try {
            const response = await fetch('https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/ticket', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Error al crear el ticket');
            }
    
            const data = await response.json();
            console.log('Respuesta del servidor:', data); // Verifica la respuesta del servidor en la consola
            onCreateTicket(data);
            onClose(); 
            window.location.reload();
    
        } catch (error) {
            console.error('Error al crear el ticket:', error);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                    <FaTimes />
                </button>
                <img src={Logo} alt="Beecker" className="w-32 mx-auto" />
                <h2 className="text-lg font-poppins font-semibold text-center mt-2 mb-2 text-gray-700">Support</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-purple-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg bg-purple-50 py-2 px-3 text-gray-700"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            maxLength="300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Problem type</label>
                        <Menu as="div" className="relative inline-block w-full text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-between rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                    {problem_type || "Select an option"}
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </MenuButton>
                            </div>
                            <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <MenuItems className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                                onClick={() => setProblem_type('Technical')}
                                            >
                                                Technical
                                            </div>
                                        )}
                                    </MenuItem>
                                    <MenuItem>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                                onClick={() => setProblem_type('Software')}
                                            >
                                                Software
                                            </div>
                                        )}
                                    </MenuItem>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Priority level</label>
                        <Menu as="div" className="relative inline-block w-full text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-between rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                    {priority_level || "Select an option"}
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </MenuButton>
                            </div>
                            <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <MenuItems className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                                onClick={() => setPriority_level('Low')}
                                            >
                                                Low
                                            </div>
                                        )}
                                    </MenuItem>
                                    <MenuItem>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                                onClick={() => setPriority_level('Medium')}
                                            >
                                                Medium
                                            </div>
                                        )}
                                    </MenuItem>
                                    <MenuItem>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                                onClick={() => setPriority_level('High')}
                                            >
                                                High
                                            </div>
                                        )}
                                    </MenuItem>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            className="mt-1 block w-full border border-purple-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg bg-purple-50 py-2 px-3 text-gray-700"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength="300"
                            rows="3"
                        ></textarea>
                        <p className="text-sm text-gray-600 mt-1">Limit: 300 characters</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">File attachment (optional)</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                            <div className="text-center">
                                {fileAttached ? (
                                    <div className="mb-2">
                                        <p className="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">Attach File: {file.name}</p>
                                    </div>
                                ) : (
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">
                                            <span>Select File</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                )}
                                <p className="text-xs leading-5 text-gray-600">JPG, PNG or PDF, file size no more than 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition duration-150"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicketModal;
