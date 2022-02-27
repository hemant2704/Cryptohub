import React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from 'react';

const drawerWidth = 210
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

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener(`resize`, handleResize);
        handleResize();
        return () => window.removeEventListener(`resize`, handleResize);
    }, []);

    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false);
        }
        else {
            setActiveMenu(true);
        }
    }, [screenSize])
    const [selectedItem, setSelectedItem] = React.useState(0);
    const pages = [
        {
            'title': 'Home',
            'link': '/Cryptohub/',
            'icon': activeMenu ? <HomeIcon /> : <HomeIcon sx={{ ml: '4rem' }} />
        },
        {
            'title': 'Cryptocurrencies',
            'link': '/Cryptohub/cryptocurrencies',
            'icon': activeMenu ? <LocalAtmIcon /> : <LocalAtmIcon sx={{ mx: '1.5rem' }} />
        },
        {
            'title': 'News',
            'link': '/Cryptohub/news',
            'icon': activeMenu ? <NewspaperIcon /> : <NewspaperIcon />
        }
    ];
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position='absolute'>
                <Toolbar>
                    <Typography sx={{ fontSize: '24px', float: 'left', fontWeight: 600 }}>
                        CryptoHub
                    </Typography>

                    {
                        !activeMenu &&
                        pages.map(page => (
                            <Link to={page.link} style={{ color: '#ffffff' }} key={page.title}>
                                {page.icon}
                            </Link>
                        ))
                    }

                </Toolbar>
            </AppBar>

            {activeMenu && (
                <Drawer variant="permanent"
                    sx={{
                        
                        '& .MuiDrawer-paper': {
                            backgroundColor: 'transparent',
                            borderRight:'0px solid'
                            
                        },
                    }}
                >
                    <List sx={{ pt: '250%', px: '0.5rem' }}>
                        {pages.map((page, index) => (
                            <Link to={page.link} style={{ textDecoration: 'none' }} key={page.title}>
                                <Tooltip title={page.title}>
                                    <ListItem button sx={{ mt: 6, backgroundColor: selectedItem === index ? '#54A0FF' : null, borderRadius: 20 }} onClick={() => setSelectedItem(index)}>
                                        <ListItemIcon>
                                            {page.icon}
                                        </ListItemIcon>
                                    </ListItem>
                                </Tooltip>

                            </Link>
                        ))}
                    </List>

                </Drawer>
            )}
        </ThemeProvider>
    );
};

export default Navbar;
