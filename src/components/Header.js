import React from 'react';
import {
    AppBar, Button, Toolbar, Box, Stack
} from '@mui/material';
import CreateDeveloper from './CreateDeveloper';
import ListOfDevelopers from './ListOfDevelopers';

const Header = () => {
    return (
        <AppBar>
            <Toolbar>
                <Box display='flex' justifyContent='space-between' width='100%'>
                    <Stack
                        spacing={4}
                        direction='row'
                        alignItems='center'
                        style={{ cursor: 'pointer' }}
                    >
                        <Button
                            color='inherit'
                        >Create developer
                            <CreateDeveloper />
                        </Button>
                        <Button
                            color='inherit'
                        >View list of developers
                            <ListOfDevelopers />
                        </Button>
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;