import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container'
const Loader = () => {
    const item = [1, 2];
    return (
        <>
            <Container maxWidth='lg' sx={{display:'flex',height:"100vh",justifyContent:'center'}}>
                <CircularProgress />
            </Container>
        </>
    )
}

export default Loader