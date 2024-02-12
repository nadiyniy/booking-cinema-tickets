import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import { BarChartProps } from '../../types';

ChartJS.register();

const BarChart = ({ chartData, chartOptions }: BarChartProps) => {
    return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
