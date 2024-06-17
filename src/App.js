import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from "./components/landingPage/LandingPage";
import Dashboard from './components/dashboard/modules/Dashboard';
import LandingPageES from "./componentsES/landingPageES/LandingPageES";
import DashboardES from "./componentsES/dashboardES/modulos/DashboardES";
import PasswordES from "./componentsES/landingPageES/PasswordES";
import Password from "./components/landingPage/Password";

function App() {
    // Definir el estado del usuario autenticado
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    // Función para verificar si el usuario está autenticado
    const checkAuth = () => {
        const token = localStorage.getItem('token');
        // Verificar si el token está presente y es válido
        if (token) {
            setUser(true);
            setPassword(true);
        } else {
            setUser(false);
            setPassword(false);
        }
    };

    // Verificar la autenticación al cargar la aplicación
    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
                <Route path='/' element={password ? <Navigate to="/password/:email/:token" /> : <LandingPage />} />
                <Route path='/ES' element={user ? <Navigate to="/dashboard/ES" /> : <LandingPageES />} />
                {/* Ruta protegida para el technicalDashboard */}
                <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" replace />} />
                <Route path='/dashboard/ES' element={user ? <DashboardES /> : <Navigate to="/ES" replace />} />
                <Route path='/password/ES/:email/:token' element={<PasswordES />} />
                <Route path='/password/:email/:token' element={<Password />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
