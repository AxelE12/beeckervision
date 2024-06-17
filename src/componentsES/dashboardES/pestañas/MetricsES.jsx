import React, { useState, useEffect } from 'react';
import MetricDetails from '../modulos/MetricDetailsES';

const MetricsES = ({ CompanyID_, onBack }) => {
    const companyName = localStorage.getItem('companyName');
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [projectsData, setProjectsData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        getData();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768);
    };

    const getData = async (companyID_) => {
        try {
            const userCompanyID = CompanyID_ || localStorage.getItem('companyID');
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/projects/${userCompanyID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data:', data);
                setProjectsData(data);
            } else {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleViewDetails = (projectID) => {
        setSelectedProjectId(projectID);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const resetSorting = () => {
        setSortConfig({ key: null, direction: 'asc' });
    };

    const sortedProjectsData = React.useMemo(() => {
        let sortableItems = [...projectsData];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [projectsData, sortConfig]);

    const filteredProjectsData = sortedProjectsData.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isClient = () => {
        return companyName !== 'Beecker';
    }

    return (
        <div className="rounded-lg bg-white h-full flex flex-col p-4">
            <h1 className="text-center font-poppins font-semibold mb-4">Métricas</h1>
            {!selectedProjectId && (
                <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
                    <div className="flex space-x-2">
                        {!isClient() && (
                            <button
                                onClick={onBack}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
                            >
                                Volver
                            </button>
                        )}
                        {!isMobileView && (
                            <button
                                onClick={resetSorting}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
                            >
                                Restablecer Orden
                            </button>
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre del proyecto"
                        className="border border-gray-300 rounded py-1 px-3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}
            {selectedProjectId ? (
                <MetricDetails companyID_={CompanyID_} projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />
            ) : (
                isMobileView ? (
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row sm:flex-wrap">
                        {filteredProjectsData.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col mb-4 sm:w-full md:w-1/2 lg:w-1/3" style={{ marginBottom: '1rem' }}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700 font-semibold">ID del Proyecto:</span>
                                    <span className="text-gray-500">{item.projectID}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700 font-semibold">Nombre del Proyecto:</span>
                                    <span className="text-gray-500">{item.projectName}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700 font-semibold">Descripción:</span>
                                    <span className="text-gray-500 text-right">{item.description}</span>
                                </div>
                                <button
                                    onClick={() => handleViewDetails(item.projectID)}
                                    className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
                                >
                                    Ver Detalles
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr className="space-x-2">
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('projectID')}>
                                    ID del Proyecto {sortConfig.key === 'projectID' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('projectName')}>
                                    Nombre del Proyecto {sortConfig.key === 'projectName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('description')}>
                                    Descripción {sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Detalles
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredProjectsData.map((item, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {item.projectID}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.projectName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleViewDetails(item.projectID)}
                                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
                                        >
                                            Ver Detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </div>
    );
};

export default MetricsES;
