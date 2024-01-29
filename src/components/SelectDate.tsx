import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, MenuItem, TextField } from '@mui/material';

import { selectSessionsDate, setSelectedDate } from '../redux/ducks/sessions';
import { setConfirmedSeat, setReservedSeats, setSelectedSeat } from '../redux/ducks/seats';
import { SelectDateProps } from '../types';
import { StyledLink } from '../styled/GlobalStyles';

const SelectDate = ({ selectedDate }: SelectDateProps) => {
    const dispatch = useDispatch();
    const date = useSelector(selectSessionsDate);

    useEffect(() => {
        dispatch({ type: 'GET_DATE' });
    }, []);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedSeat(''));
        dispatch(setConfirmedSeat(''));
        dispatch(setReservedSeats([]));
        dispatch(setSelectedDate(event.target.value));
        dispatch({ type: 'GET_SESSIONS' });
    };

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{ minWidth: '200px', marginTop: '10px', marginBottom: '10px', height: '66px' }}
        >
            <TextField
                color="secondary"
                label="Select date"
                select
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth
            >
                {date.map((item: string) => (
                    <MenuItem sx={{ padding: '0' }} value={item} key={item} aria-hidden="true">
                        <StyledLink to="session_list">{item}</StyledLink>
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default SelectDate;
