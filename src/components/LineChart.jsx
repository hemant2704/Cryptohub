import React from 'react'
import { Line } from 'react-chartjs-2'
import { Typography, Grid, Box } from '@mui/material'
import Chart from 'chart.js/auto'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];
    for (let i = coinHistory?.data?.history?.length - 1; i > 0; i -= 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString("en-US"));
    }
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: coinHistory?.data?.change[0] === '-' ? '#ff5500' : '#11ff11',
                borderColor: coinHistory?.data?.change[0] === '-' ? 'red' : 'green',
                pointBackgroundColor: coinHistory?.data?.change[0] === '-' ? 'red' : 'green',
                pointHoverBackgroundColor: 'black'
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: '20px', float: 'left', fontWeight: 600, color: '#777777', pr: 2 }}>{coinName} Price Chart:</Typography>
                    {coinHistory?.data?.change[0] === '-' ? <ArrowDownwardIcon sx={{ float: 'left', pt: 1, color: 'red' }} /> : <ArrowUpwardIcon sx={{ float: 'left', pt: 1, color: 'green' }} />}
                    <Typography color={coinHistory?.data?.change[0] === '-' ? 'red' : 'green'} sx={{ fontWeight: 600, fontSize: '20px', float: 'left' }}>
                        {coinHistory?.data?.change}%
                    </Typography>
                </Grid>
                {console.log(coinHistory?.data?.change[0])}
                <Grid item xs={6}>
                    <Typography sx={{ float: 'right', fontSize: '20px', fontWeight: 600, color: '#777777' }}>
                        Current {coinName} Price:{' '}
                        <span style={{ color: coinHistory?.data?.change[0] === '-' ? 'red' : 'green' }}>${currentPrice}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart