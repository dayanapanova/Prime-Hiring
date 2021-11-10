import React from 'react';
import { useDispatch } from 'react-redux';
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Stack,
    Container,
} from '@mui/material';
import { setFormIsOpen } from '../store/DevelopersSlice';

const Header = () => {
    const dispatch = useDispatch();

    return (
        <AppBar>
            <Toolbar>
                <Container>
                    <Stack
                        direction='row'
                        width='100%'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Typography variant="h6">
                            Prime Hiring
                        </Typography>
                        <div>
                            <Button onClick={() => dispatch(setFormIsOpen(true))} variant='outlined' color='inherit'>
                                Create developer
                            </Button>
                        </div>
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
