import React from 'react';
import Chart from 'react-apexcharts';

const ActivityChartES = () => {
    const options = {
        chart: {
            type: 'area',
            stacked: true,
            toolbar: {
                show: false
            }
        },
        colors: ['#803FE0', '#E5494B'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01']
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        }
    };

    const series = [{
        name: 'Proyecto 1',
        data: [31, 40, 28, 51, 42]
    }, {
        name: 'Proyecto 2',
        data: [11, 32, 45, 32, 34]
    }];

    return (
        <div className="rounded-lg bg-white h-full flex flex-col justify-between p-4">
            <h1 className="text-center font-poppins font-semibold">Resumen actividad</h1>
            <Chart options={options} series={series} type="area" height="350" />
        </div>
    );
}

export default ActivityChartES;
