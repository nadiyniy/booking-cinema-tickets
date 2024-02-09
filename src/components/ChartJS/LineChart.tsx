import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import { LineChartProps } from '../../types';

ChartJS.register();

const LineChart = ({ chartData, chartOptions }: LineChartProps) => {
    return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
