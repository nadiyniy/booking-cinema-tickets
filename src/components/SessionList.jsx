import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Paper, Grid } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

import StyledLink from '../styled/StyleSelectDate';

function SessionList({ selectedDate, sessions, handleSessionClick }) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <>
            <Typography
                sx={{ marginTop: '20px', marginBottom: '20px' }}
                align="center"
                variant="h2"
                className="session-list-tittle"
            >
                Sessions for {selectedDate}
            </Typography>

            <Grid component="ul" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {sessions.map((session) => (
                    <Grid component="li" item xs={2} sm={4} md={4} key={session}>
                        <Item
                            key={session}
                            sx={{ cursor: 'pointer', padding: '0' }}
                            onClick={() => handleSessionClick(session)}
                        >
                            <StyledLink to="/session_details">{session}</StyledLink>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default SessionList;

SessionList.propTypes = {
    handleSessionClick: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.string),
};

SessionList.defaultProps = {
    sessions: [],
};
