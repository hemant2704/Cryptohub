import { Grid, Typography, Container, Divider, Box } from '@mui/material';
import React from 'react';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import { millify } from 'millify';
import { Link } from 'react-router-dom'
import Crypto from './Crypto';
import News from './News';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Loader from './Loader'
const theme = createTheme({
  palette: {
    background: {
      default: "#f2f2f2"
    }
  },
  typography: {
    fontFamily: 'Fira Code',
    fontStyle: 'normal',
  }
});

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader/>;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography sx={{ fontSize: 36, fontWeight: 500, mb: 2 }}>Global Crypto Stats</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 24, fontWeight: 400, color: '#999999' }}>Total Cryptocurrencies</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{millify(globalStats.total)}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 24, fontWeight: 400, color: '#999999' }}>Total Exchanges</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{millify(globalStats.totalExchanges)}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 24, fontWeight: 400, color: '#999999' }}>Total MarketCap</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{millify(globalStats.totalMarketCap)}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 24, fontWeight: 400, color: '#999999' }}>Total 24h Volume</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{millify(globalStats.total24hVolume)}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 24, fontWeight: 400, color: '#999999' }}>Total Markets</Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{millify(globalStats.totalMarkets)}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'inline-block', width: '100%',mb:1 }}>
          <Typography sx={{ float: 'left', fontSize: 24, fontWeight: 600,  }}>Top 10 Cryptocurrencies in the world</Typography>
          <Typography sx={{ float: "right", mt:1 }}><Link to="/Cryptohub/cryptocurrencies" style={{textDecoration:'none',color:'#54A0FF'}}>Show More</Link></Typography>
        </Box>
        <Crypto simplified={true} />
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'inline-block', width: '100%',my:1 }}>
          <Typography sx={{ float: 'left', fontSize: 24, fontWeight: 600,}}>Latest Crypto News</Typography>
          <Typography sx={{ float: 'right',mt:1 }}><Link to="/Cryptohub/news" style={{textDecoration:'none',color:'#54A0FF'}}>Show More</Link></Typography>
        </Box>
        <News simplified={true} />
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
