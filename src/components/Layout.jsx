import React, { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppBar, Container, Toolbar } from '@mui/material';

import { PageLoader, SelectDate } from './index';

const Layout = ({ handleDateChange, selectedDate }) => (
    <>
        <AppBar position="static">
            <Container>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
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

Layout.propTypes = {
    selectedDate: PropTypes.string,
    handleDateChange: PropTypes.func.isRequired,
};

Layout.defaultProps = {
    selectedDate: '',
};

export default Layout;
