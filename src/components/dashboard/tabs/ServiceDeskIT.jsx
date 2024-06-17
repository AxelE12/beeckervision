import React, { useState, useEffect } from 'react';
import { FaFilter, FaPen } from 'react-icons/fa';
import FilterTicketsModal from '../../modal/FilterTicketsModal';
import EditTicket from '../modules/EditTicket'; // Import the EditTicket component

const ServiceDeskIT = () => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({});
    const [tickets, setTickets] = useState([]);
    const [editingTicket, setEditingTicket] = useState(null);

    const fetchTickets = async () => {
        try {
            const response = await fetch('https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/ticket');
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const filteredTickets = tickets.filter(ticket => {
        return (!filters.priority || ticket.priority_level === filters.priority)
            && (!filters.problemType || ticket.problem_type === filters.problemType);
    });

    const priorityStatusStyles = {
        'Low' : 'text-green-600',
        'Medium': 'text-yellow-500',
        'High': 'text-red-500',
        'Bajo': 'text-green-600',
        'Medio': 'text-yellow-500',
        'Alto': 'text-red-500'
    };
    
    const getPriorityStyle = (priority) => {
        return priorityStatusStyles[priority] || '';
    };
    
    const handleEditClick = (ticket) => {
        setEditingTicket(ticket);
    };

    const handleBackToTable = () => {
        setEditingTicket(null);
    };

    return (
        <div className="rounded-lg bg-white h-full flex flex-col p-6">
            {editingTicket ? (
                <EditTicket ticket={editingTicket} onBack={handleBackToTable} />
            ) : (
                <>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                        <h1 className="text-2xl font-bold">All tickets</h1>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowFilterModal(true)}
                                className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold py-2 px-4 rounded-full flex items-center"
                            >
                                <FaFilter className="mr-2" /> Filter
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-2 py-3">Id</th>
                                    <th scope="col" className="px-2 py-3">Subject</th>
                                    <th scope="col" className="px-2 py-3 hidden md:table-cell">Problem type</th>
                                    <th scope="col" className="px-2 py-3 hidden md:table-cell">Created by</th>
                                    <th scope="col" className="px-2 py-3 hidden md:table-cell">Created on</th>
                                    <th scope="col" className="px-2 py-3 hidden md:table-cell">Priority</th>
                                    <th scope="col" className="px-2 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTickets.map((ticket, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-2 py-4">{ticket.ticket_id}</td>
                                        <td className="px-2 py-4">{ticket.subject}</td>
                                        <td className="px-2 py-4 hidden md:table-cell">{ticket.problem_type}</td>
                                        <td className="px-2 py-4 hidden md:table-cell">{ticket.created_by}</td>
                                        <td className="px-2 py-4 hidden md:table-cell">{ticket.created_at}</td>
                                        <td className={`px-2 py-4 hidden md:table-cell ${getPriorityStyle(ticket.priority_level)}`}>
                                            {ticket.priority_level && (
                                                <span className="flex items-center justify-center">
                                                    <span className="h-2 w-2 mr-2 rounded-full" style={{ backgroundColor: getPriorityStyle(ticket.priority_level).split('-')[1] }}></span>
                                                    {ticket.priority_level}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-2 py-4">
                                            <button
                                                className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-full"
                                                onClick={() => handleEditClick(ticket)}>
                                                <FaPen />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {showFilterModal && (
                        <FilterTicketsModal
                            onClose={() => setShowFilterModal(false)}
                            onApplyFilters={(newFilters) => setFilters(newFilters)}
                        />
                    )}
                </>
            )}
        </div>
    );
};
export default ServiceDeskIT;
