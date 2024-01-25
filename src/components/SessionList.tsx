import { Typography, Grid } from '@mui/material';

import { StyledLink } from '../styled/GlobalStyles';
import SessionListItem from '../styled/SessionListStyled';
import { SessionListProps } from '../types';

const SessionList = ({ selectedDate, sessions, handleSessionClick }: SessionListProps) => (
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
            {sessions.map((session: string) => (
                <Grid component="li" item xs={2} sm={4} md={4} key={session}>
                    <SessionListItem
                        key={session}
                        sx={{ cursor: 'pointer', padding: '0' }}
                        onClick={() => handleSessionClick(session)}
                    >
                        <StyledLink to="/session_details">{session}</StyledLink>
                    </SessionListItem>
                </Grid>
            ))}
        </Grid>
    </>
);

export default SessionList;