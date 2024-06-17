import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, ChartBarIcon, ChartPieIcon, ChartBarSquareIcon } from '@heroicons/react/20/solid';
import RadialBarChart from '../graficas/RadialBarChartES';
import BarChart from '../graficas/BarChartES';
import LineChart from '../graficas/LineChartES';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const MetricDetailsES = ({ projectId, companyID_, onBack }) => {
    const [project, setProject] = useState(null);
    const [chartType, setChartType] = useState('radialBar');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const getProjectDetails = async () => {
            try {
                const companyID = companyID_ || localStorage.getItem('companyID');
                const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/projects/${companyID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const project = data.find(p => p.projectID === projectId);
                    if (project) {
                        const { retorno, inversion } = project;
                        console.log('Inversión:', inversion);
                        console.log('Retorno:', retorno);
                        const roiValue = ((retorno - inversion) / inversion) * 100;
                        setProject({ ...project, roi: roiValue });
                    }
                } else {
                    const errorMessage = await response.text();
                    console.error('Error:', errorMessage);
                }
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
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getExecutions = async () => {
        const botId = 1;
        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/executions/${botId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log('EJECUCIONES:', data);
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getExecutions();
        getBots();
    }, [projectId]);

    const renderChart = () => {
        switch (chartType) {
            case 'radialBar':
                return <RadialBarChart roi={project?.roi || 0} />;
            case 'bar':
                return <BarChart />;
            case 'line':
                return <LineChart />;
            default:
                return <RadialBarChart roi={project?.roi || 0} />;
        }
    };

    if (!project) {
        return <div>Cargando...</div>;
    }

    // Additional Metrics
    project.tasksCompleted = 54;
    const percentageTasksCompleted = (project.tasksCompleted / (project.tasksCompleted + project.tasksPending)) * 100;
    const costPerTask = project.inversion / project.tasksCompleted;
    const timeRemaining = new Date('2024-07-24') - new Date();

    return (
        <div className="rounded-lg bg-white h-full flex flex-col p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={onBack}
                    className="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-opacity-90"
                >
                    Volver
                </button>
                <h1 className="text-2xl font-semibold">{project.name}</h1>
            </div>
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                <div className="lg:w-1/2 flex flex-col items-center justify-center p-4 space-y-4 bg-white rounded-lg shadow-lg">
                    {renderChart()}
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
                                Seleccionar Tipo de Gráfico
                                {menuOpen ? (
                                    <ChevronUpIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
                                ) : (
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
                                )}
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            afterLeave={() => setMenuOpen(false)}
                        >
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
                                                Gráfico de Barra Radial
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
                                                Gráfico de Barras
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
                                                Gráfico de Líneas
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center p-4 space-y-4 bg-white rounded-lg shadow">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p><strong>ID:</strong> {projectId}</p>
                        <p><strong>Descripción:</strong> {project.description}</p>
                        <p><strong>Presupuesto:</strong> ${project.inversion}</p>
                        <p><strong>Fecha límite:</strong> 24/07/2024</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p><strong>Tareas completadas:</strong> 54</p>
                        <p><strong>Tareas pendientes:</strong> 1</p>
                        <div className="flex items-center">
                            <p className="mr-2"><strong>Progreso:</strong></p>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className="bg-purple-600 h-4 rounded-full" style={{ width: `${percentageTasksCompleted}%`, backgroundImage: 'linear-gradient(to right, #E3494D 25%, #6200D1 55%, #6310C0 75%)' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p><strong>ROI:</strong> {project.roi.toFixed(2)}%</p>
                        <p><strong>Costo por tarea:</strong> ${costPerTask.toFixed(2)}</p>
                        <p><strong>Tiempo restante:</strong> {Math.ceil(timeRemaining / (1000 * 60 * 60 * 24))} días</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetricDetailsES;
