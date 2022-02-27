import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Box, Typography, Grid, Card, CardContent, Divider, Container } from '@mui/material'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoAPI';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'; import TagIcon from '@mui/icons-material/Tag';
import BoltIcon from '@mui/icons-material/Bolt';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import StopOutlined from '@mui/icons-material/DoDisturbAltOutlined';
import ExclamationCircleOutlined from '@mui/icons-material/ReportGmailerrorredOutlined';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LineChart from './LineChart';
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
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const CryptoDetails = () => {
  const [timePeriod, setTimePeriod] = useState('7d');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (e) => {
    setTimePeriod(e.target.innerText);
    handleClose();
  }
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
  const cryptoDetails = data?.data?.coin;
  if (isFetching) return <Loader/>
  const time = ['3h', '24h', '7d', '30d','3m', '1y', '3y', '5y'];
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <MonetizationOnOutlinedIcon /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <TagIcon /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] === undefined ? '' : millify(cryptoDetails?.['24hVolume'])}`, icon: <BoltIcon /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <MonetizationOnOutlinedIcon /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <EmojiEventsOutlinedIcon /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <LocalGroceryStoreOutlinedIcon /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <CurrencyExchangeOutlinedIcon /> },
    { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Typography align={'center'} sx={{ fontSize: 24, fontWeight: 600, }}>{cryptoDetails?.name} ({cryptoDetails?.symbol}) Price</Typography>
        <Typography align={'center'} sx={{ fontSize: 20, fontWeight: 500, color: '#777777' }}>{cryptoDetails?.name} live price in US dollars. View value statistics, market cap and supply</Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ width: '100%', mb: 1 }}>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            sx={{ width: "10%" }}
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {timePeriod}
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {time.map((period) =>
              <MenuItem onClick={handleChange} disableRipple key={period}>
                {period}
              </MenuItem>
            )
            }
          </StyledMenu>
        </Box>
        <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Typography align={'center'} sx={{ fontSize: 22, fontWeight: 600, mt: 1 }}>{cryptoDetails?.name} Value Statistics</Typography>
            <Typography align={'center'} sx={{ fontSize: 16, fontWeight: 400, mt: 0.5, mb: 2, color: '#777777' }}> An overview showing the stats of {cryptoDetails?.name}</Typography>
            {
              stats.map(({ icon, title, value }) => (
                <Card sx={{ height: "40", mb: 1 }} key={title} raised>
                  <CardContent>
                    <Typography sx={{ float: 'left', pb: 1, pr: 1 }}>{icon}</Typography>
                    <Typography sx={{ float: 'left', color: '#777777', fontWeight: 600 }}>{title}</Typography>
                    <Typography sx={{ float: "right", fontWeight: 600 }}>{value}</Typography>
                  </CardContent>
                </Card>
              ))
            }
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography align={'center'} sx={{ fontSize: 22, fontWeight: 600, mt: 1 }}>Other Statistics</Typography>
            <Typography align={'center'} sx={{ fontSize: 16, fontWeight: 400, mt: 0.5, mb: 2, color: '#777777' }}> An overview showing the stats of all Cryptocurrencies</Typography>
            {
              genericStats.map(({ icon, title, value }) => (
                <Card sx={{ height: "40", mb: 1 }} key={title} raised>
                  <CardContent>
                    <Typography sx={{ float: 'left', pb: 1, pr: 1 }}>{icon}</Typography>
                    <Typography sx={{ float: 'left', color: '#777777', fontWeight: 600 }}>{title}</Typography>
                    <Typography sx={{ float: "right", fontWeight: 600 }}>{value}</Typography>
                  </CardContent>
                </Card>
              ))
            }
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 24, fontWeight: 600 }}>What is {cryptoDetails?.name}?</Typography>
            <Typography>{HTMLReactParser(cryptoDetails?.description !== undefined ? cryptoDetails?.description : '')}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 24, fontWeight: 600, mb: 2 }}>{cryptoDetails?.name} Links:</Typography>
            {
              cryptoDetails?.links.map((link) => (
                <Card sx={{ height: "30", mb: 1 }} key={link.url} raised>
                  <CardContent>
                    <Typography sx={{ float: 'left', pb: 2, fontWeight: 600 }}>{link.type}</Typography>
                    <a href={link.url} target="_blank" rel='noreferrer'><Typography sx={{ float: "right", fontWeight: 600, color: "#54A0FF" }}>{link.name}</Typography></a>
                  </CardContent>
                </Card>
              ))
            }
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
};

export default CryptoDetails;