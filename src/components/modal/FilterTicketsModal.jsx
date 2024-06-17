import React, { useState, Fragment } from 'react';
import { FaTimes } from 'react-icons/fa';
import Logo from "../../assets/Group 2119.png";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const FilterTicketsModal = ({ onClose, onApplyFilters }) => {
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [problemType, setProblemType] = useState('');

    const handleApplyFilters = () => {
        onApplyFilters({ status, priority, problemType });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                    <FaTimes />
                </button>
                <img src={Logo} alt="Beecker" className="w-32 mx-auto" />
                <h2 className="text-lg font-poppins font-semibold text-center mt-2 mb-4 text-gray-700">Filter Tickets</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <Menu as="div" className="relative inline-block w-full text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-between rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                    {status || "Select an option"}
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </MenuButton>
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
                                <MenuItems className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                                onClick={() => setStatus('Open')}
                                            >
                                                Open
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
                                                onClick={() => setStatus('Awaiting response')}
                                            >
                                                Awaiting response
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
                                                onClick={() => setStatus('Closed')}
                                            >
                                                Closed
                                            </div>
                                        )}
                                    </MenuItem>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Priority</label>
                        <Menu as="div" className="relative inline-block w-full text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-between rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                    {priority || "Select an option"}
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </MenuButton>
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
                                <MenuItems className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                                onClick={() => setPriority('Low')}
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
                                                onClick={() => setPriority('Medium')}
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
                                                onClick={() => setPriority('High')}
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
                        <label className="block text-sm font-medium text-gray-700">Problem Type</label>
                        <Menu as="div" className="relative inline-block w-full text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-between rounded-md bg-purple-50 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                    {problemType || "Select an option"}
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </MenuButton>
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
                                <MenuItems className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                )}
                                                onClick={() => setProblemType('Technical')}
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
                                                onClick={() => setProblemType('Software')}
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
                        <button
                            type="button"
                            onClick={handleApplyFilters}
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md transition duration-150 mt-4">
                            Apply Filters
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FilterTicketsModal;
