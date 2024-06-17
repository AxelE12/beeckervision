import React, { useState } from 'react';

const ViewTicketES = ({ ticket, onBack }) => {
    const [messages, setMessages] = useState(ticket.messages || []);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'Usuario', // This should be dynamic, based on the current user
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div>
            <button onClick={onBack} className="bg-purple-200 hover:bg-purple-300 text-purple-800 py-1 px-3 rounded-full mb-4">
                Volver a Tickets
            </button>
            <h2 className="text-2xl font-bold mb-4">Editar Ticket: {ticket.ticket_id}</h2>
            <div className="mb-4">
                <p><strong>Título:</strong> {ticket.subject}</p>
                <p><strong>Tipo de Problema:</strong> {ticket.problem_type}</p>
                <p><strong>Creado Por:</strong> {ticket.created_by}</p>
                <p><strong>Creado El:</strong> {ticket.created_at}</p>
                <p><strong>Prioridad:</strong> {ticket.priority_level}</p>
            </div>

            <div className="border-t pt-4">
                <h3 className="text-xl font-bold mb-4">Mensajes</h3>
                <div className="mb-4 h-64 overflow-y-scroll">
                    {messages.map(message => (
                        <div key={message.id} className={`mb-2 ${message.sender === 'Usuario' ? 'text-right' : 'text-left'}`}>
                            <div className="text-gray-600 text-sm">
                                {message.sender} - {new Date(message.timestamp).toLocaleString()}
                            </div>
                            <div className={`p-2 rounded inline-block ${message.sender === 'Usuario' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex mt-14">
                    <input
                        type="text"
                        className="flex-1 p-2 border rounded"
                        placeholder="Escribe tu mensaje..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded ml-2"
                        onClick={handleSendMessage}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewTicketES;
