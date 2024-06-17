import React, { useState, useEffect } from 'react';
import DefaultSidebar from "./DefaultSidebarES";
import DefaultNavbar from "./DefaultNavbarES";
import ROIES from './ROIES';
import MetricsES from '../pestañas/MetricsES';
import ActivityES from '../pestañas/ActivityES';
import ServiceDeskES from '../pestañas/ServiceDeskES';
import ActivityChartES from "./ActivityChartES";
import TimeES from "./TimeES";
import TemporalES from "./TemporalES";
import ProfileSettingsES from '../perfil/ProfileSettingsES';
import CompaniesDashboardES from './CompaniesDashboardES';
import CompaniesActivityES from './CompaniesActivityES';
import CompaniesMetricsES from "./CompaniesMetricsES";
import ServiceDeskITES from '../pestañas/ServiceDeskIT_ES';
import CompanyMembersES from './CompanyMembersES';


const DashboardES = () => {
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

    // Call the getProject function when the component loads
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
                        <div className='flex-1 flex flex-col lg:flex-row px-1 py-1 overflow-auto w-full'>
                            {activeComponent === 'ROI' && (
                                <div className='flex flex-col lg:flex-row w-full'>
                                    <div className='w-full lg:w-1/3 flex flex-col'>
                                        <div className='flex-1 m-1'>
                                            <ROIES />
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-1/3 flex flex-col'>
                                        <div className='flex-1 m-1'>
                                            <TimeES />
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-1/3 flex flex-col'>
                                        <div className='flex-1 m-1'>
                                            <ActivityChartES />
                                        </div>
                                        <div className='flex-1 m-1'>
                                            <TemporalES />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeComponent === 'Metrics' && (
                                <div className='w-full'>
                                    <MetricsES />
                                </div>
                            )}
                            {activeComponent === 'Activity' && (
                                <div className='w-full'>
                                    <ActivityES />
                                </div>
                            )}
                            {activeComponent === 'ServiceDesk' && (
                                <div className='w-full'>
                                    <ServiceDeskES />
                                </div>
                            )}
                            {activeComponent === 'Settings' && (
                                <div className='w-full p-1'>
                                    <ProfileSettingsES />
                                </div>
                            )}
                            {activeComponent === 'CompanyMembers' && (
                                <div className='w-full p-1'>
                                    <CompanyMembersES />
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
                    <div className={`w-64 border-r-2 absolute z-10 lg:relative lg:z-auto transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
                        <DefaultSidebar active={activeComponent} onChange={handleComponentChange} />
                    </div>
                    <div className='flex-1 flex flex-col'>
                        {/* Navbar that includes a toggle button for the sidebar */}
                        <DefaultNavbar toggleSidebar={toggleSidebar} onSettingsClick={() => handleComponentChange('Settings')}onCompanyClick={() => handleComponentChange('CompanyMembers')} />
                        {/* Main content area that changes based on the active component */}
                        <div className='flex-1 flex flex-col lg:flex-row px-1 py-1 overflow-auto w-full'>
                            {activeComponent === 'ROI' && (
                                <div className='w-full p-1'>
                                    <CompaniesDashboardES/>
                                </div>
                            )}
                            {/* Modulos */}
                            {activeComponent === 'Metrics' && (
                                <div className='w-full'>
                                    <CompaniesMetricsES />
                                </div>
                            )}
                            {activeComponent === 'Activity' && (
                                <div className='w-full'>
                                    <CompaniesActivityES />
                                </div>
                            )}
                            {activeComponent === 'ServiceDesk' && (
                                <div className='w-full'>
                                    <ServiceDeskITES />
                                </div>
                            )}
                            {activeComponent === 'Settings' && (
                                <div className='w-full p-1'>
                                    <ProfileSettingsES />
                                </div>
                            )}
                             {activeComponent === 'CompanyMembers' && (
                                <div className='w-full p-1'>
                                    <CompanyMembersES />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardES;
