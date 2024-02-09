import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import { DoughnutChartProps } from '../../types';

ChartJS.register();

const DoughnutChart = ({ chartData, chartOptions }: DoughnutChartProps) => {
    return <Doughnut data={chartData} options={chartOptions} />;
};

export default DoughnutChart;
