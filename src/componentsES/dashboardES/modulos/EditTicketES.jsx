import React, { useState } from 'react';

const EditTicketES = ({ ticket, onBack }) => {
    const [messages, setMessages] = useState(ticket.messages || []);
    const [newMessage, setNewMessage] = useState('');
    const [status, setStatus] = useState(ticket.status);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'IT', // Esto debería ser dinámico, basado en el usuario actual
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    const handleCloseTicket = async () => {
        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/ticket/${ticket.ticket_id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Fallo al eliminar el ticket ${ticket.ticket_id}`);
            }

            console.log(`Ticket ${ticket.ticket_id} eliminado correctamente.`);
            
            // Recargar la página
            window.location.reload();

        } catch (error) {
            console.error('Error al eliminar el ticket:', error);
        }
    };


    const handleDownloadFile = () => {
        if (ticket.file) {
            // Assuming ticket.file contains the downloadURL from Firebase Storage
            return (
                <a href={ticket.file} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-full inline-block" download>
                    <svg className="w-4 h-4 inline-block mr-1 -mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Descargar
                </a>
            );
        } else {
            return "No hay archivo adjunto";
        }
    };

    return (
        <div className="relative">
            <button onClick={onBack} className="bg-purple-200 hover:bg-purple-300 text-purple-800 py-1 px-3 rounded-full mb-4">
                Volver a Tickets
            </button>
            <button
                className={`absolute top-0 right-0 mt-4 mr-4 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full ${status === 'Cerrado' && 'opacity-50 cursor-not-allowed'}`}
                onClick={handleCloseTicket}
                disabled={status === 'Cerrado'}
            >
                {status === 'Cerrado' ? 'Ticket Cerrado' : 'Cerrar Ticket'}
            </button>
            <h2 className="text-2xl font-bold mb-4">Editar Ticket: {ticket.ticket_id}</h2>
            <div className="mb-4">
                <p><strong>Título:</strong> {ticket.subject}</p>
                <p><strong>Tipo de Problema:</strong> {ticket.problem_type}</p>
                <p><strong>Creado Por:</strong> {ticket.created_by}</p>
                <p><strong>Creado En:</strong> {ticket.created_at}</p>
                <p><strong>Prioridad:</strong> {ticket.priority_level}</p>
                <p><strong>Archivo Adjunto:</strong> {handleDownloadFile()} </p>
            </div>

            <div className="border-t pt-4">
                <h3 className="text-xl font-bold mb-4">Mensajes</h3>
                <div className="mb-4 h-64 overflow-y-scroll">
                    {messages.map(message => (
                        <div key={message.id} className={`mb-2 ${message.sender === 'IT' ? 'text-right' : 'text-left'}`}>
                            <div className="text-gray-600 text-sm">
                                {message.sender} - {new Date(message.timestamp).toLocaleString()}
                            </div>
                            <div className={`p-2 rounded inline-block ${message.sender === 'IT' ? 'bg-purple-100' : 'bg-gray-100'}`}>
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

export default EditTicketES;
