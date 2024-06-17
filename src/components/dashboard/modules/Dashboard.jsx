import React, { useState, useEffect } from 'react';
import DefaultSidebar from "./DefaultSidebar";
import DefaultNavbar from "./DefaultNavbar";
import ROI from './ROI';
import Metrics from '../tabs/Metrics';
import Activity from '../tabs/Activity';
import ServiceDesk from '../tabs/ServiceDesk';
import ActivityChart from "./ActivityChart";
import Time from "./Time";
import Temporal from "./Temporal";
import ProfileSettings from '../profile/ProfileSettings'; // Add this import for the Settings view
import CompaniesDashboard from './CompaniesDashboard';
import CompaniesMetrics from './CompaniesMetrics';
import CompaniesActivty from './CompaniesActivity';
import ServiceDeskIT from '../tabs/ServiceDeskIT';
import CompanyMembers from './CompanyMembers';

const Dashboard = () => {
    const companyName = localStorage.getItem('companyName');

    const isClient = () => {
        if (companyName === 'Beecker') {
            return false;
        } else {
            return true;
        }
    }
    // State to manage which component is currently active
    const [activeComponent, setActiveComponent] = useState('ROI');
    // State to manage the visibility of the sidebar on smaller screens
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to change the active component and close the sidebar
    const handleComponentChange = (component) => {
        setActiveComponent(component);
        setIsSidebarOpen(false);
    }

    // Function to toggle the sidebar's visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const getProject = async () => {
        const companyID = localStorage.getItem('companyID');

        try {
            const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/projects/${companyID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('horasTrabajadas', data.reduce((acc, project) => acc + parseFloat(project.horasTrabajadas), 0));
            } else {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    //llamar a la función getProject al cargar el componente
    useEffect(() => {
        getProject();
    }, []);

    if (isClient()) {
        return (
            <div className='flex flex-col h-screen'>
                <div className='flex flex-1 overflow-hidden'>
                    {/* Sidebar - visible on large screens or when toggled on small screens */}
                    <div className={`w-64 border-r-2 absolute z-10 lg:relative lg:z-auto transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
                        <DefaultSidebar active={activeComponent} onChange={handleComponentChange} />
                    </div>
                    <div className='flex-1 flex flex-col'>
                        {/* Navbar that includes a toggle button for the sidebar */}
                        <DefaultNavbar toggleSidebar={toggleSidebar} onSettingsClick={() => handleComponentChange('Settings')} onCompanyClick={() => handleComponentChange('CompanyMembers')} />
                        {/* Main content area that changes based on the active component */}
                        <div className='flex-1 flex flex-col lg:flex-row overflow-auto w-full p-1'>
                            {activeComponent === 'ROI' && (
                                <div className='flex flex-col lg:flex-row w-full'>
                                    <div className='w-full lg:w-1/3 flex flex-col'>
                                        <div className='flex-1 m-1'>
                                            <ROI />
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-1/3 flex flex-col'>
                                        <div className='flex-1 m-1'>
                                            <Time />
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-1/3 flex flex-col'>
                                        <div className='flex-1 m-1'>
                                            <ActivityChart />
                                        </div>
                                        <div className='flex-1 m-1'>
                                            <Temporal />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Modules */}
                            {activeComponent === 'Metrics' && (
                                <div className='w-full p-1'>
                                    <Metrics />
                                </div>
                            )}
                            {activeComponent === 'Activity' && (
                                <div className='w-full p-1'>
                                    <Activity />
                                </div>
                            )}
                            {activeComponent === 'ServiceDesk' && (
                                <div className='w-full p-1'>
                                    <ServiceDesk />
                                </div>
                            )}
                            {activeComponent === 'Settings' && (
                                <div className='w-full p-1'>
                                    <ProfileSettings />
                                </div>
                            )}
                            {activeComponent === 'CompanyMembers' && (
                                <div className='w-full p-1'>
                                    <CompanyMembers />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='flex flex-col h-screen'>
                <div className='flex flex-1 overflow-hidden'>
                    {/* Sidebar - visible on large screens or when toggled on small screens */}
                    <div
                        className={`w-64 border-r-2 absolute z-10 lg:relative lg:z-auto transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
                        <DefaultSidebar active={activeComponent} onChange={handleComponentChange}/>
                    </div>
                    <div className='flex-1 flex flex-col'>
                        {/* Navbar that includes a toggle button for the sidebar */}
                        <DefaultNavbar toggleSidebar={toggleSidebar}
                                       onSettingsClick={() => handleComponentChange('Settings')}
                                       onCompanyClick={() => handleComponentChange('CompanyMembers')}/>
                        {/* Main content area that changes based on the active component */}
                        <div className='flex-1 flex flex-col lg:flex-row overflow-auto w-full p-1'>
                            {activeComponent === 'ROI' && (
                                <div className='w-full p-1'>
                                    <CompaniesDashboard/>
                                </div>
                            )}
                            {activeComponent === 'Metrics' && (
                                <div className='w-full p-1'>
                                    <CompaniesMetrics/>
                                </div>
                            )}
                            {activeComponent === 'Activity' && (
                                <div className='w-full p-1'>
                                    <CompaniesActivty/>
                                </div>
                            )}
                            {activeComponent === 'ServiceDesk' && (
                                <div className='w-full p-1'>
                                    <ServiceDeskIT/>
                                </div>
                            )}
                            {activeComponent === 'Settings' && (
                                <div className='w-full p-1'>
                                    <ProfileSettings/>
                                </div>
                            )}
                            {activeComponent === 'CompanyMembers' && (
                                <div className='w-full p-1'>
                                    <CompanyMembers />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
