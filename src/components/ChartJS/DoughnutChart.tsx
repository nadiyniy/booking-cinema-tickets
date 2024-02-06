import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

ChartJS.register();

const DoughnutChart = ({ chartData }: any) => {
    return <Doughnut data={chartData} />;
};

export default DoughnutChart;
