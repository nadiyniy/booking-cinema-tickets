import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

ChartJS.register();

const LineChart = ({ chartData, chartOptions }: any) => {
    return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
