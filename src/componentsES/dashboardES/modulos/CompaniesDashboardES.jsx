import React, { useState, useEffect } from 'react';
import ROI from './ROIES';

const CompanyCard = ({ company }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-center font-poppins font-semibold text-3xl bg-clip-text text-transparent mt-4"
                style={{
                        backgroundImage: 'linear-gradient(to right, #E3494D 25%, #6200D1 55%, #6310C0 75%)'
                    }}>{company.companyName}
            </h2>
            <p className="text-gray-500 text-sm text-center">ID de Compañía: {company.companyID}</p>

            <div className="mt-4 flex flex-col flex-row lg:flex-col">
                <ROI companyID_ ={company.companyID} />
            </div>
        </div>
    );
};

const CompaniesDashboardES = () => {
    const [companies, setCompanies] = useState([]);
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getCompanies();
        getProjects();
    }, []);

    const getCompanies = async () => {
        try {
            const response = await fetch('https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/companies', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Companies:', data);
                setCompanies(data);
            } else {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    const getProjects = async () => {
        try {
            const response = await fetch('https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            } else {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCompanies = companies.filter(company =>
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="rounded-lg bg-#f7f7f9 h-full flex flex-col justify-start p-4">
            <h1 className="text-center font-poppins font-semibold mb-4">Resumen de Compañías</h1>
            <input
                type="text"
                placeholder="Buscar por Nombre de Compañía"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border rounded-lg"
            />
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCompanies.map((company) => (
                    <CompanyCard key={company.companyID} company={company} />
                ))}
            </div>
        </div>
    );
}

export default CompaniesDashboardES;
