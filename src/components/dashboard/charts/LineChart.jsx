import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
            text: 'Monthly ROI'
        }
    };

    const lineSeries = [
        {
            name: '2023 ROI',
            data: [5, 15, 10, 20, 25, 30, 25, 35, 30, 25, 20, 15]
        },
        {
            name: '2022 ROI',
            data: [10, 20, 15, 25, 30, 35, 30, 40, 35, 30, 25, 20]
        }
    ];

    return <Chart options={lineOptions} series={lineSeries} type="line" height={440} />;
};

export default LineChart;
