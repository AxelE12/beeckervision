import React from 'react';
import Chart from 'react-apexcharts';

const BarChartES = () => {
    const barOptions = {
        chart: {
            type: 'bar',
            height: 440,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
                horizontal: true,
                barHeight: '80%',
            },
        },
        colors: ['#E5494B', '#803FE0'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            }
        },
        yaxis: {
            stepSize: 1
        },
        tooltip: {
            shared: false,
            x: {
                formatter: function(val) {
                    return val;
                }
            },
            y: {
                formatter: function(val) {
                    return Math.abs(val) + "%";
                }
            }
        },
        title: {
            text: 'ROI Mensual - Gastos vs Ganancias'
        },
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            title: {
                text: 'Meses'
            },
            labels: {
                formatter: function(val) {
                    return Math.abs(Math.round(val)) + "%";
                }
            }
        },
    };

    const barSeries = [
        {
            name: 'Gastos',
            data: [-5, -10, -15, -20, -25, -30, -35, -30, -25, -20, -15, -10]
        },
        {
            name: 'Ganancias',
            data: [10, 15, 20, 25, 30, 35, 40, 35, 30, 25, 20, 15]
        }
    ];

    return <Chart options={barOptions} series={barSeries} type="bar" height={440} />;
};

export default BarChartES;
