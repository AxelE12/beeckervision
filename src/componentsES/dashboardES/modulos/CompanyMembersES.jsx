import React, { useState, useEffect } from 'react';

const CompanyMembersES = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const companyID = localStorage.getItem('companyID');

    const StatusDot = ({ status }) => {
        const statusColors = {
            online: 'bg-green-500',
            offline: 'bg-gray-500',
            away: 'bg-yellow-500',
            busy: 'bg-red-500',
        };
    
        return (
            <span className={`inline-block w-3 h-3 ${statusColors[status]} rounded-full`} title={status}></span>
        );
    };

    const fetchCompanyMembers = async () => {
        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/users/${companyID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError('An error occurred while fetching the company members.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCompanyMembers();
    }, [companyID]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="rounded-lg bg-white h-full p-8 font-poppins">
            <h2 className="text-3xl font-bold mb-6">Miembros de la compañía</h2>
            <div>
                <button onClick={fetchCompanyMembers} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4 mt-4">
                    Recargar Miembros
                </button>
            </div>
            {/* Table for larger screens */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Foto de Perfil</th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {members.map((member) => (
                            <tr key={member.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{member.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{member.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{member.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    <img className="h-10 w-10 rounded-full object-cover mx-auto" src={member.profilePic || 'https://robohash.org/1x1'} alt={member.username} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center justify-center">
                                    <StatusDot status={member.status.toLowerCase()} />
                                    <span className="ml-2">{member.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Cards for smaller screens */}
            <div className="block lg:hidden space-y-4">
                {members.map((member) => (
                    <div key={member.id} className="bg-white shadow rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                            <img className="h-12 w-12 rounded-full object-cover" src={member.profilePic || 'https://robohash.org/1x1'} alt={member.username} />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{member.username}</h3>
                                <p className="text-sm text-gray-600">{member.role}</p>
                                <p className="text-sm text-gray-600">{member.email}</p>
                                <div className="flex items-center text-sm text-gray-600">
                                    <StatusDot status={member.status.toLowerCase()} />
                                    <span className="ml-2">{member.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyMembersES;
