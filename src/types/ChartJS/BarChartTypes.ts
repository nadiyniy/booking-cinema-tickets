import { ChartData, ChartOptions } from 'chart.js';

export type BarChartProps = {
    chartData: ChartData<'bar'>;
    chartOptions: ChartOptions<'bar'>;
};
