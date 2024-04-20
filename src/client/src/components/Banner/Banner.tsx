import * as React from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function Banner() {


    return (
        <Container maxWidth="lg"    sx={{
            bgcolor: 'background.paper',
            boxShadow: 10,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            maxHeight:500,
        }}>
            <Box sx={{ width: '100%' }}>
                <img src="https://i.pravatar.cc/300?img=1" alt="banner" />


            </Box>
        </Container>
    );
}