import React, { useState, useEffect, Fragment } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, ChartBarIcon, ChartPieIcon, ChartBarSquareIcon } from '@heroicons/react/20/solid';
import RadialBarChart from '../charts/RadialBarChart';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ROI = ({companyID_}) => {
    const [roi, setROI] = useState(0);
    const [chartType, setChartType] = useState('radialBar');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
    }, []);

    

    const calculateROI = async (companyID_) => {

        //use companyID just in case the companyID_ is not passed
        const companyID = companyID_ || localStorage.getItem('companyID');


        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/projects/${companyID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                const totalInversion = data.reduce((acc, project) => acc + parseFloat(project.inversion), 0);
                const totalRetorno = data.reduce((acc, project) => acc + parseFloat(project.retorno), 0);
                const totalROI = ((totalRetorno - totalInversion) / totalInversion) * 100;
                console.log('Total Inversion:', totalInversion);
                console.log('Total Retorno:', totalRetorno);
                console.log('Total ROI:', totalROI);
                setROI(totalROI);
            } else {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    calculateROI(companyID_);

    const renderChart = () => {
        switch (chartType) {
            case 'radialBar':
                return <RadialBarChart roi={roi} />;
            case 'bar':
                return <BarChart />;
            case 'line':
                return <LineChart />;
            default:
                return <RadialBarChart roi={roi} />;
        }
    };

    return (
        <div className="rounded-lg bg-white h-full flex flex-col justify-between p-4">
            <p className="text-center font-semibold font-poppins">Return on Investment Overview</p>
            <div className="flex-1 flex items-center justify-center">
                {renderChart()}
            </div>
            <Menu as="div" className="relative inline-block text-left self-end mt-4">
                <div>
                    <Menu.Button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: 'linear-gradient(to right, #803FE0, #E5494B)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-opacity-90"
                    >
                        Select Chart Type
                        {menuOpen ? (
                            <ChevronUpIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
                        ) : (
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
                        )}
                    </Menu.Button>
                </div>
                <Menu.Items className="absolute right-0 bottom-full z-10 mb-2 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => setChartType('radialBar')}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'w-full px-4 py-2 text-left text-sm flex items-center gap-2'
                                    )}
                                >
                                    <ChartPieIcon className="w-5 h-5" />
                                    Radial Bar Chart
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => setChartType('bar')}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'w-full px-4 py-2 text-left text-sm flex items-center gap-2'
                                    )}
                                >
                                    <ChartBarIcon className="w-5 h-5" />
                                    Bar Chart
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => setChartType('line')}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'w-full px-4 py-2 text-left text-sm flex items-center gap-2'
                                    )}
                                >
                                    <ChartBarSquareIcon className="w-5 h-5" />
                                    Line Chart
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    );
};

export default ROI;
