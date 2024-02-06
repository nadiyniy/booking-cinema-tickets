import { Container, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { defaults } from 'chart.js/auto';

import { BarChart, LineChart, DoughnutChart } from '.';

import dataSet from './ChartJS/data.json';

const sortedData = dataSet.slice().sort((a, b) => a.year - b.year);

defaults.responsive = true;

defaults.plugins.title.display = true;
// defaults.plugins.title.align = 'start';
defaults.plugins.title.color = 'black';

const ChartJSUser = () => {
    const [userDataBar] = useState({
        labels: sortedData.map((data) => data.year),
        datasets: [
            {
                label: 'Users Gained',
                data: dataSet.map((data) => data.userGain),
                backgroundColor: ['rgba(255, 205, 86, 0.2)'],
                borderRadius: 2,
                borderColor: ['rgb(255, 159, 64)'],
                borderWidth: 1,
                grouped: false
            },
            {
                label: 'Users Lost',
                data: dataSet.map((data) => data.userLost),
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgb(255, 99, 132)'],
                borderWidth: 1
            }
        ]
    });
    const [userDataLine] = useState({
        labels: sortedData.map((data) => data.year),
        datasets: [
            {
                label: 'Users Gains',
                data: dataSet.map((data) => data.userGain),
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(153, 102, 255)'],
                borderWidth: 2
            },
            {
                label: 'Users Lost',
                data: dataSet.map((data) => data.userLost),
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgb(75, 192, 192)'],
                borderWidth: 2,
                fill: true
            }
        ]
    });
    const [userDataDoughnut] = useState({
        labels: sortedData.map((data) => data.year),
        datasets: [
            {
                label: 'Users Gains',
                data: dataSet.map((data) => data.userGain),
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: ['rgb(153, 102, 255)', 'rgb(75, 192, 192)', 'rgb(255, 159, 64)', 'rgb(255, 99, 132)'],
                borderWidth: 2,
                borderRadius: 5,
                hoverBorderWidth: 3,
                hoverOffset: 60,
                offset: 20
            }
        ]
    });
    return (
        <Container>
            <Typography align="center" variant="h2" mb={2}>
                ChartJS
            </Typography>
            <Paper>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <BarChart chartData={userDataBar} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LineChart chartData={userDataLine} />
                    </Grid>
                    <Grid item xs={6}>
                        <DoughnutChart chartData={userDataDoughnut} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ChartJSUser;
