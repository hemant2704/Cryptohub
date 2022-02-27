import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoAPI';

import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
      vertical: 'bottom',
      horizontal: 'left',
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

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = (props) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (e) => {
    setNewsCategory(e.target.innerText);
    handleClose();
  }

  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: props.simplified ? 6 : 20 })
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader/>
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        !props.simplified && (
          <>
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {newsCategory}
              {console.log(newsCategory)}
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
              <MenuItem onClick={handleChange} disableRipple >
                  Cryptocurrency
                </MenuItem>
              {data?.data?.coins.map((coin) =>
                <MenuItem onClick={handleChange} disableRipple key={coin.name}>
                  {coin.name}
                </MenuItem>
              )
              }
            </StyledMenu>
          </>
        )
      }
      <Grid container sx={{mt:1}} rowSpacing={2} columnSpacing={2}>
        {
          cryptoNews.value.map((news, i) => (
            <Grid item key={i} xs={12} md={6}>
              <a href={news.url} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
                <Card raised>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={9}>
                        <Typography sx={{fontSize:20,fontWeight:600}}>
                          {news.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}><img src={news?.image?.thumbnail?.contentUrl || demoImage} width='100' height='100' style={{borderRadius:10,marginLeft:2}} /></Grid>
                    </Grid>
                    <Box>
                      <Typography sx={{fontSize:16,fontWeight:400}}>
                        {
                          news.description > 100
                            ?
                            `${news.description.substring(0, 100)}...`
                            :
                            news.description
                        }
                      </Typography>
                    </Box>
                    <Box sx={{pt:2,pb:1}}>
                      <Box sx={{ display: 'inline' }}>
                        <Avatar sx={{ float: 'left', width: 24, height: 24 }} alt="" src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                        <Typography sx={{ float: 'left',pl:2,fontSize:12,fontWeight:600,color:'#999999' }}>{news.provider[0]?.name}</Typography>
                      </Box>
                      <Typography sx={{ float: 'right',fontSize:12,fontWeight:600,color:'#999999', }}>{moment(news.datePublished).startOf('ss').fromNow()}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </a>
            </Grid>
          ))
        }
      </Grid>
    </ThemeProvider>
  )
};

export default News;
