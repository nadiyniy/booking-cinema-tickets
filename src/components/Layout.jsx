/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { AppBar, Container, Toolbar } from '@mui/material';

import { PageLoader, SelectDate } from './index';

function Layout({ handleDateChange, selectedDate }) {
    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar sx={{ justifyContent: 'space-between', color: 'peach' }}>
                        <Link to="/">
                            <img src="/cinema-logo.svg" alt="logo" width="150" />
                        </Link>
                        <SelectDate handleDateChange={handleDateChange} selectedDate={selectedDate} />
                    </Toolbar>
                </Container>
            </AppBar>
            <Container>
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </Container>
        </>
    );
}

export default Layout;
