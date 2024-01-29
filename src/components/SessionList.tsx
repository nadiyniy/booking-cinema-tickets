import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container } from '@mui/material';

import { selectAllSessions, setSelectedSession } from '../redux/ducks/sessions';
import { setConfirmedSeat, setReservedSeats, setSelectedSeat } from '../redux/ducks/seats';
import { SessionListProps } from '../types';
import { StyledLink } from '../styled/GlobalStyles';
import SessionListItem, { TypographyStyled } from '../styled/SessionListStyled';

const SessionList = ({ selectedDate, setOpen }: SessionListProps) => {
    const sessions: string[] = useSelector(selectAllSessions);
    const dispatch = useDispatch();

    const handleSessionClick = (session: string) => {
        dispatch(setSelectedSeat(''));
        dispatch(setConfirmedSeat(''));
        dispatch(setReservedSeats([]));
        dispatch(setSelectedSession(session));
        setOpen(true);
    };

    return (
        <Container>
            <TypographyStyled align="center" variant="h2">
                Sessions for {selectedDate}
            </TypographyStyled>

            <Grid component="ul" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {sessions.map((session: string) => (
                    <Grid component="li" item xs={2} sm={4} md={4} key={session}>
                        <SessionListItem key={session} onClick={() => handleSessionClick(session)}>
                            <StyledLink to="/session_details">{session}</StyledLink>
                        </SessionListItem>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SessionList;
