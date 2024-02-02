import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Button, Container } from '@mui/material';

import { PageLoader, SelectDate } from './index';

import { LayoutProps } from '../types';
import { ToolbarStyled } from '../styled/LayoutStyled';

const Layout = ({ selectedDate }: LayoutProps) => (
    <>
        <AppBar position="static" color="transparent">
            <Container>
                <ToolbarStyled>
                    <Link to="/">
                        <Button>
                            <img src="/cinema-logo.svg" alt="logo" width="150" />
                        </Button>
                    </Link>
                    <Link to="/movies">
                        <Button>React Grid</Button>
                    </Link>
                    <Link to="/todos">
                        <Button>GraphQL</Button>
                    </Link>

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
