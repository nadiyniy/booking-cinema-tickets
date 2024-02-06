import { Container, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';

import { BarChart, LineChart } from '.';

import { dataSet } from './ChartJS/data';

const sortedData = dataSet.slice().sort((a, b) => a.year - b.year);
const backgroundColor = [
    [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
    ],
    [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
    ]
];
const ChartJSUser = () => {
    const [userDataBar] = useState({
        labels: sortedData.map((data) => data.year),
        datasets: [
            {
                label: 'Users Gained',
                data: dataSet.map((data) => data.userGain),
                backgroundColor: ['rgba(255, 205, 86, 0.2)'],
                borderColor: ['rgb(255, 159, 64)'],
                borderWidth: 1
            },
            {
                label: 'Users Gained',
                data: dataSet.map((data) => data.userGain),
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(153, 102, 255)'],
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
                borderWidth: 1
            },
            {
                label: 'Users Lost',
                data: dataSet.map((data) => data.userLost),
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgb(75, 192, 192)'],
                borderWidth: 1
            }
        ]
    });

    return (
        <Container>
            <Typography align="center" variant="h2" mb={2}>
                ChartJS
            </Typography>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <BarChart chartData={userDataBar} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LineChart chartData={userDataLine} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ChartJSUser;
