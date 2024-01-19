/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Container, Toolbar } from '@mui/material';
import PageLoader from '../../LoaderSpinner/LoaderSpinner';
import SelectDate from '../SelectDate/SelectDate';
import CinemaLogo from '../../images/cinema-logo1.svg';

function Layout({ handleDateChange, selectedDate }) {
    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar sx={{ justifyContent: 'space-between', color: 'peach' }}>
                        <Link to="/">
                            <img src={CinemaLogo} alt="logo" width="150" />
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
