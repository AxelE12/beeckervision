import React, { useState } from 'react';

const ExportPDFModal = ({ isOpen, onClose, onExport }) => {
    const [selectedCharts, setSelectedCharts] = useState({
        executionStatus: true,
        executionDuration: true,
        cpuUsage: true,
        memoryUsage: true,
        stepsCompleted: true,
        errorFrequency: true,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedCharts(prevState => ({ ...prevState, [name]: checked }));
    };

    const handleExport = () => {
        onExport(selectedCharts);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">Select Charts to Export</h2>
                <div className="mb-4">
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            name="executionStatus"
                            checked={selectedCharts.executionStatus}
                            onChange={handleCheckboxChange}
                        />
                        Execution Status
                    </label>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            name="executionDuration"
                            checked={selectedCharts.executionDuration}
                            onChange={handleCheckboxChange}
                        />
                        Execution Duration
                    </label>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            name="cpuUsage"
                            checked={selectedCharts.cpuUsage}
                            onChange={handleCheckboxChange}
                        />
                        CPU Usage
                    </label>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            name="memoryUsage"
                            checked={selectedCharts.memoryUsage}
                            onChange={handleCheckboxChange}
                        />
                        Memory Usage
                    </label>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            name="stepsCompleted"
                            checked={selectedCharts.stepsCompleted}
                            onChange={handleCheckboxChange}
                        />
                        Steps Completed
                    </label>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            name="errorFrequency"
                            checked={selectedCharts.errorFrequency}
                            onChange={handleCheckboxChange}
                        />
                        Error Frequency
                    </label>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-3 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-3 rounded"
                    >
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportPDFModal;
