import React from 'react';
import Chart from 'react-apexcharts';

const Temporal = () => {
    const options = {
        chart: {

            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    margin: 5,
                    size: '60%', // Increase for larger gauge
                    background: 'transparent'
                },
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '100%',
                    margin: 5,
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#999',
                        opacity: 1,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: -2,
                        fontSize: '22px'
                    }
                }
            }
        },
        fill: {
            colors: ['#803FE0'], // Single flat color for the gauge
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['Performance']
    };

    const series = [76];  // Adjust based on actual performance

    return (
        <div className="rounded-lg bg-white h-full flex flex-col justify-between p-4">
            <h1 className="text-center font-poppins font-semibold">Tasa de Éxito</h1>
            <div className="flex-1 flex items-center justify-center">
                <Chart options={options} series={series} type="radialBar" />
            </div>
        </div>
    );
};

export default Temporal;
