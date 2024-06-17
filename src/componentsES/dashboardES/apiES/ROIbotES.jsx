import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';

const ROIbotES = ({ projectId }) => {
    const [roi, setROI] = useState(0);
    const [chartType, setChartType] = useState('radialBar');
    console.log('Project ID:', projectId);

    const calculateROI = useCallback(async () => {
        const companyID = localStorage.getItem('companyID');
        const response = await fetch(`https://wf8ih91spk.execute-api.us-east-1.amazonaws.com/projects/${companyID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Data:', data);
            const project = data.find(p => p.projectID === projectId);
            if (project) {
                const { retorno, inversion } = project;
                console.log('Inversion:', inversion);
                console.log('Retorno:', retorno);
                const roiValue = ((retorno - inversion) / inversion) * 100;
                console.log('ROI:', roiValue);
                setROI(roiValue);
            }
        } else {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
        }
    }, [projectId]);

    useEffect(() => {
        calculateROI();
    }, [calculateROI]);

    const radialBarOptions = {
        chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: 0,
                endAngle: 360,
                hollow: {
                    margin: 0,
                    size: '65%',
                    background: '#fff',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                track: {
                    background: '#D3D4D7',
                    strokeWidth: '100%',
                    margin: 0,
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                },
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '24px'
                    },
                    value: {
                        formatter: function(val) {
                            return parseInt(val) + '%';
                        },
                        color: '#111',
                        fontSize: '32px',
                        show: true,
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#E5494B'],
                colorStops: [
                    {
                        offset: 0,
                        color: "#803FE0",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "#E5494B",
                        opacity: 1
                    }
                ],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['RDI']
    };

    const radialBarSeries = [roi];

    const lineOptions = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false
            }
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        }
    };

    const lineSeries = [{
        name: 'ROI',
        data: [10, 41, 35, 51, 63]
    }];

    const options = chartType === 'radialBar' ? radialBarOptions : lineOptions;
    const series = chartType === 'radialBar' ? radialBarSeries : lineSeries;

    const toggleChartType = () => {
        if (chartType === 'radialBar') {
            setChartType('line');
        } else {
            setChartType('radialBar');
        }
    };

    return (
        <div className="rounded-lg bg-white h-full flex flex-col justify-between p-4">
            <p className="text-center font-semibold font-poppins"> Retorno de Inversión del Proyecto</p>
            <div className="flex-1 flex items-center justify-center">
                <Chart options={options} series={series} type={chartType} height={350}/>
            </div>
            <button
                onClick={toggleChartType}
                style={{
                    background: 'linear-gradient(to right, #803FE0, #E5494B)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                className="self-end mt-4"
            >
                Alternar Gráfico
            </button>
        </div>
    );
};

export default ROIbotES;
