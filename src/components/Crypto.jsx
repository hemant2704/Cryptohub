import React, { useEffect, useState } from 'react';
import { millify } from 'millify';
import { Link } from 'react-router-dom'
import { TextField, Box, Divider, Typography, Container, Grid, Card, CardContent, CardMedia } from "@mui/material"
import { useGetCryptosQuery } from '../services/cryptoAPI';
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

const Crypto = (props) => {
  const count = props.simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData)
  }, [cryptosList, searchTerm]);
  if (isFetching) return <Loader/>
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        !props.simplified ?
          <TextField sx={{ width: '20%', mb: 3 }} margin='dense' variant='standard' label="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
          :
          null
      }
      <Grid container rowSpacing={1} columnSpacing={1}>
        {cryptos?.map(currency => (
          <Grid item xs={12} md={6} lg={3} key={currency.uuid}>
            <Link to={`/Cryptohub/crypto/${currency.uuid}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '200px', minWidth: 250 }} raised>
                <CardContent>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography sx={{fontWeight:500,fontSize:20}}>
                        {`${currency.rank}. ${currency.name}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}><img src={currency.iconUrl} width='30' height='30'/></Grid>
                  </Grid>
                  <Divider sx={{mb:3,mt:1}}/>
                  <Box sx={{}}>
                    
                    <Typography sx={{fontSize:16}}>
                      <span style={{fontWeight:600,color:'#999999'}}>Price: </span> <span style={{fontWeight:600}}>{millify(currency.price)}</span>
                    </Typography>
                    <Typography sx={{fontWeight:400,fontSize:16}}>
                    <span style={{fontWeight:600,color:'#999999'}}>Market Cap: </span> <span style={{fontWeight:600}}>{millify(currency.marketCap)}</span>
                    </Typography>
                    <Typography sx={{fontWeight:400,fontSize:16}}>
                    <span style={{fontWeight:600,color:'#999999'}}>Daily Change: </span> <span style={{fontWeight:600}}>{millify(currency.change)}</span>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default Crypto;
