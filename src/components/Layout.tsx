import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Container } from '@mui/material';

import { PageLoader, SelectDate } from './index';

import { LayoutProps } from '../types';
import { ToolbarStyled } from '../styled/LayoutStyled';

const Layout = ({ selectedDate }: LayoutProps) => (
    <>
        <AppBar position="static">
            <Container>
                <ToolbarStyled>
                    <Link to="/">
                        <img src="/cinema-logo.svg" alt="logo" width="150" />
                    </Link>
                    <Link to="/movies">movie</Link>
                    <SelectDate selectedDate={selectedDate} />
                </ToolbarStyled>
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
