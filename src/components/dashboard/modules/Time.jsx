import React, { useState, useEffect } from 'react';

const Time = () => {
    const [hoursSaved, setHoursSaved] = useState(0);

    useEffect(() => {
        const horasTrabajadas = parseFloat(localStorage.getItem('horasTrabajadas'));
        const horasAhorradas = horasTrabajadas * 3;
        setHoursSaved(horasAhorradas);
    }, []); // Asegúrate de pasar las dependencias adecuadas si es necesario

    return (
        <div className="rounded-lg bg-white h-full flex flex-col justify-start p-4">
            <h1 className="text-center font-poppins font-semibold mb-4">Savings Overview</h1>
            <div className='flex-grow flex flex-col justify-center'>
                <h1 className="text-center font-poppins font-semibold text-4xl">Hours Saved</h1>
                <h2 className="text-center font-poppins font-semibold text-4xl bg-clip-text text-transparent mt-4"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #E3494D 25%, #6200D1 55%, #6310C0 75%)'
                    }}>
                    {hoursSaved.toFixed(1)} HRS
                </h2>
                <h1 className="text-center font-poppins font-semibold text-4xl mt-4">Money Saved</h1>
                <h2 className="text-center font-poppins font-semibold text-4xl bg-clip-text text-transparent mt-4"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #E3494D 25%, #6200D1 55%, #6310C0 75%)'
                    }}>
                    $1,230.45
                </h2>
            </div>
        </div>
    );
}

export default Time;
