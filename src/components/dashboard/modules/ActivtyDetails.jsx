import React, { useState, useEffect } from 'react';
import BotExecutions from '../api/BotExecutions';

const ActivityDetails = ({ projectId, onBack }) => {
    const [project, setProject] = useState(null);
    const [bots, setBots] = useState([]);
    const [selectedBotId, setSelectedBotId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const getProjectDetails = async () => {
            try {
                const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/projects/${projectId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                setProject(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getProjectDetails();
    }, [projectId]);

    const getBots = async () => {
        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/bots/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log('BOTS:', data);
            setBots(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleViewDetails = (botID) => {
        setSelectedBotId(botID);
    };

    useEffect(() => {
        getBots();
    }, [projectId]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
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

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sortedBots = React.useMemo(() => {
        let sortableItems = [...bots];
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
    }, [bots, sortConfig]);

    const filteredAndSortedBots = sortedBots.filter(bot =>
        bot.botID.toString().toLowerCase().includes(searchTerm)
    );

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="rounded-lg bg-white h-full flex flex-col p-1 overflow-auto">
            {!selectedBotId && (
                <div>
                    <button
                        onClick={onBack}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded mx-auto"
                    >
                        Back
                    </button>
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Bots in Project</h2>
                        <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
                            {!isMobileView && (
                                <button
                                    onClick={resetSorting}
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
                                >
                                    Reset Sorting
                                </button>
                            )}
                            <input
                                type="text"
                                placeholder="Search by Bot ID"
                                className="border border-gray-300 rounded py-1 px-2"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
            )}
            {selectedBotId ? (
                <BotExecutions botId={selectedBotId} onBack={() => setSelectedBotId(null)} />
            ) : (
                isMobileView ? (
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row sm:flex-wrap">
                        {filteredAndSortedBots.map((bot, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col mb-4 sm:w-full md:w-1/2 lg:w-1/3" style={{ marginBottom: '1rem' }}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700 font-semibold">Bot ID:</span>
                                    <span className="text-gray-500">{bot.botID}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700 font-semibold">Project ID:</span>
                                    <span className="text-gray-500">{bot.projectID}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700 font-semibold">Bot Name:</span>
                                    <span className="text-gray-500">{bot.botName}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700 font-semibold">Avg Executions:</span>
                                    <span className="text-gray-500">{bot.avgExecutions}</span>
                                </div>
                                <button
                                    onClick={() => handleViewDetails(bot.botID)}
                                    className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 overflow-x-auto">
                        <table className="min-w-full text-sm text-center text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 cursor-pointer"
                                        onClick={() => handleSort('botID')}
                                    >
                                        Bot ID {sortConfig.key === 'botID' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 cursor-pointer"
                                        onClick={() => handleSort('projectID')}
                                    >
                                        Project ID {sortConfig.key === 'projectID' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 cursor-pointer"
                                        onClick={() => handleSort('botName')}
                                    >
                                        Bot Name {sortConfig.key === 'botName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 cursor-pointer"
                                        onClick={() => handleSort('avgExecutions')}
                                    >
                                        Average Monthly Executions {sortConfig.key === 'avgExecutions' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedBots.map((bot, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{bot.botID}</td>
                                        <td className="px-6 py-4">{bot.projectID}</td>
                                        <td className="px-6 py-4">{bot.botName}</td>
                                        <td className="px-6 py-4">{bot.avgExecutions}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewDetails(bot.botID)}
                                                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
                                            >
                                                View Details
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

export default ActivityDetails;
