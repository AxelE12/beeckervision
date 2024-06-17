import React, { useState, useEffect } from 'react';
import Metrics from '../pestañas/MetricsES';

const CompanyCard = ({ company, onClick }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4" onClick={() => onClick(company.companyID)}>
            <h2 className="text-center font-poppins font-semibold text-3xl bg-clip-text text-transparent mt-4"
                style={{
                    backgroundImage: 'linear-gradient(to right, #E3494D 25%, #6200D1 55%, #6310C0 75%)'
                }}>{company.companyName}
            </h2>
            <p className="text-gray-500 text-sm text-center">ID de la Compañía: {company.companyID}</p>
            <img src= {company.logo} alt="Company Logo" className="mx-auto mt-4" />
        </div>
    );
};

const CompaniesMetricsES = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompanyID, setSelectedCompanyID] = useState(null);

    useEffect(() => {
        getCompanies();
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
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCompanies = companies.filter(company =>
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCompanyClick = (companyID) => {
        setSelectedCompanyID(companyID);
    };

    return (
        <div className="rounded-lg bg-#f7f7f9 h-full flex flex-col justify-start p-4">
            {selectedCompanyID ? (
                <Metrics CompanyID_={selectedCompanyID} />
            ) : (
                <>
                    <h1 className="text-center font-poppins font-semibold mb-4">Compañías</h1>
                    <input
                        type="text"
                        placeholder="Buscar por Nombre de Compañía"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="mb-4 p-2 border rounded-lg"
                    />
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCompanies.map((company) => (
                            <CompanyCard key={company.companyID} company={company} onClick={handleCompanyClick} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CompaniesMetricsES;
