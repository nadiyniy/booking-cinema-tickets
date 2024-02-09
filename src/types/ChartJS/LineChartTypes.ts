import { ChartData, ChartOptions } from 'chart.js';

export type LineChartProps = {
    chartData: ChartData<'line'>;
    chartOptions: ChartOptions<'line'>;
};
