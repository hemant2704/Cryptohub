import React from 'react'
import { Box, Container, Grid, Typography, Stack, Tooltip, Card, Avatar } from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
const theme = createTheme({

  typography: {
    fontFamily: 'Spartan, sans-serif',
    fontStyle: 'normal',
  },
});
const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="footer" sx={{ bgcolor: 'black', py: 3 }}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={6}>
              <Typography align='center' gutterBottom sx={{ mt: 1,fontWeight:600, fontSize: '36px', color: 'white' }}>
                Cryptohub
              </Typography>
              <Typography align='center' gutterBottom sx={{ fontWeight:600,fontSize: '16px', color: 'white' }}>
                Daily Crypto analysis, news and more...
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Stack spacing={1}>
                  <Tooltip title='Github' placement="right">
                    <a href='https://www.github.com/hemant2704' target='_blank' rel="noreferrer"><GitHubIcon color='primary' /></a>
                  </Tooltip>
                  <Tooltip title='LinkedIN' placement="right">
                    <a href='https://www.linkedin.com/in/hemant-singh-75022719b' target='_blank' rel="noreferrer"><LinkedInIcon color='primary' /></a>
                  </Tooltip>
                  <Tooltip title='Portfolio' placement="right">
                    <a href='https://hemant2704.github.io/hemant-portfolio' target='_blank' rel="noreferrer"><LanguageIcon color='primary' /></a>
                  </Tooltip>
                </Stack>
              </div>
            </Grid>
          </Grid>

        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Footer