import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { AppBar, Container, Toolbar } from '@mui/material';

import { PageLoader, SelectDate } from './index';
import { LayoutProps } from '../types';

const Layout = ({ selectedDate }: LayoutProps) => (
    <>
        <AppBar position="static">
            <Container>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Link to="/">
                        <img src="/cinema-logo.svg" alt="logo" width="150" />
                    </Link>
                    <SelectDate selectedDate={selectedDate} />
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

export default Layout;
