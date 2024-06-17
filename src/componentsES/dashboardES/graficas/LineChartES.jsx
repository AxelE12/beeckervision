import React from 'react';
import Chart from 'react-apexcharts';

const LineChartES = () => {
    const lineOptions = {
        chart: {
            height: 440,
            type: 'line',
            toolbar: {
                show: false
            }
        },
        colors: ['#803FE0', '#E5494B'],
        stroke: {
            width: [3, 3],
            curve: 'smooth'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        },
        yaxis: {
            title: {
                text: 'ROI (%)'
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
        title: {
            text: 'ROI Mensual'
        }
    };

    const lineSeries = [
        {
            name: 'ROI 2023',
            data: [5, 15, 10, 20, 25, 30, 25, 35, 30, 25, 20, 15]
        },
        {
            name: 'ROI 2022',
            data: [10, 20, 15, 25, 30, 35, 30, 40, 35, 30, 25, 20]
        }
    ];

    return <Chart options={lineOptions} series={lineSeries} type="line" height={440} />;
};

export default LineChartES;
