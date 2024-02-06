import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

ChartJS.register();

const BarChart = ({ chartData }: any) => {
    return <Bar data={chartData} />;
};

export default BarChart;
