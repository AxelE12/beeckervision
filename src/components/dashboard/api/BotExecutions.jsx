import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { CSVLink } from 'react-csv';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Logo from "../../../assets/Group 2119.png";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const BotExecutions = ({ botId, onBack }) => {
    const [executions, setExecutions] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    const handleResize = () => {
        setIsMobileView(window.innerWidth < 1260);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getExecutions = async () => {
        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/executions/${botId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log('EXECUTIONS:', data);
            setExecutions(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getExecutions();
    }, [botId]);

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

    const sortedExecutions = React.useMemo(() => {
        let sortableItems = [...executions];
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
    }, [executions, sortConfig]);

    const filteredAndSortedExecutions = sortedExecutions.filter(execution =>
        execution.executionID && execution.executionID.toString().toLowerCase().includes(searchTerm)
    );

    const executionStatusData = [
        { name: 'Success', value: executions.filter(e => e.executionStatus === 'success').length },
        { name: 'Failure', value: executions.filter(e => e.executionStatus === 'failure').length }
    ];

    const botExecutionCounts = executions.reduce((acc, cur) => {
        acc[cur.botID] = acc[cur.botID] || { success: 0, failure: 0 };
        if (cur.executionStatus === 'success') {
            acc[cur.botID].success += 1;
        } else {
            acc[cur.botID].failure += 1;
        }
        return acc;
    }, {});

    const botExecutionData = Object.keys(botExecutionCounts).map(botID => ({
        botID,
        success: botExecutionCounts[botID].success,
        failure: botExecutionCounts[botID].failure
    }));

    const executionDurationData = executions.map(e => ({
        executionID: e.executionID,
        executionDuration: e.executionDuration
    }));

    const cpuUsageData = executions.map(e => ({
        executionID: e.executionID,
        cpuUsage: e.cpuUsage
    }));

    const memoryUsageData = executions.map(e => ({
        executionID: e.executionID,
        memoryUsage: e.memoryUsage
    }));

    const stepsCompletedData = executions.map(e => ({
        executionID: e.executionID,
        stepsCompleted: e.stepsCompleted
    }));

    const errorFrequency = executions.reduce((acc, cur) => {
        const response = cur.response || 'Unknown Error';
        if (cur.response === 'Execution completed successfully') {
            return acc;
        }
        acc[response] = acc[response] ? acc[response] + 1 : 1;
        return acc;
    }, {});

    const errorFrequencyData = Object.keys(errorFrequency).map(error => ({
        error,
        count: errorFrequency[error]
    }));

    const exportToCSV = () => {
        const headers = [
            { label: "Execution ID", key: "executionID" },
            { label: "Bot ID", key: "botID" },
            { label: "Status", key: "executionStatus" },
            { label: "Start Time", key: "executionStartTime" },
            { label: "End Time", key: "executionEndTime" },
            { label: "Duration (s)", key: "executionDuration" },
            { label: "CPU Usage", key: "cpuUsage" },
            { label: "Memory Usage", key: "memoryUsage" },
            { label: "Steps Completed", key: "stepsCompleted" },
            { label: "Response", key: "response" },
        ];
        return {
            filename: 'executions.csv',
            headers: headers,
            data: filteredAndSortedExecutions
        };
    };

    const exportToPDF = async () => {
        const doc = new jsPDF();
        doc.addImage(Logo, 'PNG', 87, 5, 35, 20);
        doc.text('Bot Executions', 105, 32, { align: 'center' });
        doc.text('Generated on: ' + new Date().toLocaleString(), 105, 40, { align: 'center' });
        doc.text('Bot ID: ' + botId, 15, 60);
        doc.text('Total Executions: ' + filteredAndSortedExecutions.length, 15, 70);

        autoTable(doc, {
            startY: 80,
            head: [['Execution ID', 'Bot ID', 'Status', 'Start Time', 'End Time', 'Duration (s)', 'CPU Usage', 'Memory Usage', 'Steps Completed', 'Response']],
            body: filteredAndSortedExecutions.map(e => [
                e.executionID, e.botID, e.executionStatus, new Date(e.executionStartTime).toLocaleString(), new Date(e.executionEndTime).toLocaleString(),
                e.executionDuration, e.cpuUsage, e.memoryUsage, e.stepsCompleted, e.response
            ])
        });

        //add the charts
        const addChartToPDF = async (selector, x, y, width, height) => {
            const element = document.querySelector(selector);
            if (element) {
                const canvas = await html2canvas(element, { backgroundColor: 'white' , scale: 2});
                const imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', x, y, width, height);
            }
        };        

        doc.addPage();
        await addChartToPDF('.execution-status-chart', 20, 10, 70, 50);
        doc.setFontSize(8);
        doc.text(' Success: ' + executionStatusData[0].value, 30, 65);
        doc.text(' Failure: ' + executionStatusData[1].value, 60, 65);
        await addChartToPDF('.execution-duration-chart', 120, 10 , 70, 50);
        doc.setFontSize(8);
        await addChartToPDF('.cpu-usage-chart', 20, 80, 70, 50);
        await addChartToPDF('.memory-usage-chart', 120, 80, 70, 50);
        await addChartToPDF('.steps-completed-chart', 20, 150, 70, 50);
        await addChartToPDF('.error-frequency-chart', 120, 150, 70, 50);
        doc.text('Error Frequency messages: \n' + errorFrequencyData.map(e => e.error + ': ' + e.count).join('\n'), 120, 210);

        doc.save('executions.pdf');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredAndSortedExecutions);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Executions');
        XLSX.writeFile(wb, 'executions.xlsx');
    };

    if (!executions) {
        return <div>Loading...</div>;
    }

    return (
        <div className="rounded-lg bg-white h-full flex flex-col">
            <div>
            <button onClick={onBack} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded mx-auto mb-4">Back</button>
                <h2 className="text-lg font-semibold mb-4">Bot Executions</h2>
                <div className="flex justify-between mb-4">
                    <button onClick={getExecutions} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded">Reload Executions</button>
                    <input
                        type="text"
                        placeholder="Search by Execution ID"
                        className="border border-gray-300 rounded py-1 px-2"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <CSVLink {...exportToCSV()} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded mr-2">Export CSV</CSVLink>
                    <button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded mr-2">Export PDF</button>
                    <button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded">Export Excel</button>
                </div>
                {isMobileView ? (
                    <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
                        {filteredAndSortedExecutions.map((execution) => (
                            <div key={execution.executionID} className="bg-white shadow-xl rounded-lg p-4">
                                <div><strong>Execution ID:</strong> {execution.executionID}</div>
                                <div><strong>Bot ID:</strong> {execution.botID}</div>
                                <div><strong>Status:</strong> <span className={execution.executionStatus === 'success' ? 'text-green-600' : 'text-red-600'}>{execution.executionStatus}</span></div>
                                <div><strong>Start Time:</strong> {new Date(execution.executionStartTime).toLocaleString()}</div>
                                <div><strong>End Time:</strong> {new Date(execution.executionEndTime).toLocaleString()}</div>
                                <div><strong>Duration (s):</strong> {execution.executionDuration}</div>
                                <div><strong>CPU Usage:</strong> {execution.cpuUsage}</div>
                                <div><strong>Memory Usage:</strong> {execution.memoryUsage}</div>
                                <div><strong>Steps Completed:</strong> {execution.stepsCompleted}</div>
                                <div><strong>Response:</strong> {execution.response}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-y-auto max-h-96">
                    <table className="w-full text-sm text-center text-gray-500 mb-8">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('executionID')}>
                                    Execution ID {sortConfig.key === 'executionID' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('botID')}>
                                    Bot ID {sortConfig.key === 'botID' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('executionStatus')}>
                                    Status {sortConfig.key === 'executionStatus' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('executionStartTime')}>
                                    Start Time {sortConfig.key === 'executionStartTime' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('executionEndTime')}>
                                    End Time {sortConfig.key === 'executionEndTime' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('executionDuration')}>
                                    Duration (s) {sortConfig.key === 'executionDuration' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('cpuUsage')}>
                                    CPU Usage {sortConfig.key === 'cpuUsage' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('memoryUsage')}>
                                    Memory Usage {sortConfig.key === 'memoryUsage' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('stepsCompleted')}>
                                    Steps Completed {sortConfig.key === 'stepsCompleted' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('response')}>
                                    Response {sortConfig.key === 'response' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedExecutions.map((execution) => (
                                <tr key={execution.executionID} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{execution.executionID}</td>
                                    <td className="px-6 py-4">{execution.botID}</td>
                                    <td className={`px-6 py-4 ${execution.executionStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>{execution.executionStatus}</td>
                                    <td className="px-6 py-4">{new Date(execution.executionStartTime).toLocaleString()}</td>
                                    <td className="px-6 py-4">{new Date(execution.executionEndTime).toLocaleString()}</td>
                                    <td className="px-6 py-4">{execution.executionDuration}</td>
                                    <td className="px-6 py-4">{execution.cpuUsage}</td>
                                    <td className="px-6 py-4">{execution.memoryUsage}</td>
                                    <td className="px-6 py-4">{execution.stepsCompleted}</td>
                                    <td className="px-6 py-4">{execution.response}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                )}
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Execution Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4 execution-status-chart">
                        <h3 className="font-semibold mb-2">Execution Status</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={executionStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                                    {executionStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Success' ? '#803FE0' : '#F44336'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 execution-duration-chart">
                        <h3 className="font-semibold mb-2">Execution Duration</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={executionDurationData}>
                                <XAxis dataKey="executionID" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="executionDuration" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 cpu-usage-chart">
                        <h3 className="font-semibold mb-2">CPU Usage</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={cpuUsageData}>
                                <XAxis dataKey="executionID" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="cpuUsage" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 memory-usage-chart">
                        <h3 className="font-semibold mb-2">Memory Usage</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={memoryUsageData}>
                                <XAxis dataKey="executionID" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="memoryUsage" fill="#803FE0" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 steps-completed-chart">
                        <h3 className="font-semibold mb-2">Steps Completed</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stepsCompletedData}>
                                <XAxis dataKey="executionID" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="stepsCompleted" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 error-frequency-chart">
                        <h3 className="font-semibold mb-2">Error Frequency</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={errorFrequencyData}>
                                <XAxis dataKey="error" hide />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#F44336" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BotExecutions;
