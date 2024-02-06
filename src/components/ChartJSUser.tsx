import { Container, Paper, Typography } from '@mui/material';
import { BarChart } from '.';
import { useState } from 'react';

const dataSet = [
    { id: 1, year: 2018, userGain: 9200, userLost: 480 },
    { id: 2, year: 2020, userGain: 10500, userLost: 400 },
    { id: 3, year: 2017, userGain: 8300, userLost: 700 },
    { id: 4, year: 2022, userGain: 11000, userLost: 180 },
    { id: 5, year: 2019, userGain: 9800, userLost: 520 },
    { id: 6, year: 2024, userGain: 12050, userLost: 50 },
    { id: 7, year: 2021, userGain: 10700, userLost: 250 },
    { id: 8, year: 2016, userGain: 8000, userLost: 800 },
    { id: 9, year: 2023, userGain: 11600, userLost: 120 },
    { id: 10, year: 2025, userGain: 12200, userLost: 100 },
    { id: 11, year: 2027, userGain: 13500, userLost: 320 },
    { id: 12, year: 2028, userGain: 14000, userLost: 400 },
    { id: 13, year: 2026, userGain: 13000, userLost: 230 },
    { id: 14, year: 2030, userGain: 15000, userLost: 600 },
    { id: 15, year: 2029, userGain: 14700, userLost: 470 }
];

const sortedData = dataSet.slice().sort((a, b) => a.year - b.year);

const ChartJSUser = () => {
    const [userData] = useState({
        labels: sortedData.map((data) => data.year),
        datasets: [
            {
                label: 'User Gained',
                data: dataSet.map((data) => data.userGain),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }
        ]
    });

    return (
        <Container>
            <Typography align="center" variant="h2">
                ChartJS
            </Typography>
            <Paper>
                <Typography align="center" variant="h6">
                    Bar Chart
                </Typography>
                <BarChart chartData={userData} />
            </Paper>
        </Container>
    );
};

export default ChartJSUser;
