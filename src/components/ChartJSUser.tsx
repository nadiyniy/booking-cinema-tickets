import { Container, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';

import { BarChart, LineChart } from '.';

import { dataSet } from './ChartJS/data';

const sortedData = dataSet.slice().sort((a, b) => a.year - b.year);

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
                borderWidth: 2
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
