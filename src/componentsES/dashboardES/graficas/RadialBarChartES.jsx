import React from 'react';
import Chart from 'react-apexcharts';

const RadialBarChartES = ({ roi }) => {
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

    return <Chart options={radialBarOptions} series={radialBarSeries} type="radialBar" height={350} />;
};

export default RadialBarChartES;
