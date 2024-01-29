import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';

import { selectSessionsDate, setSelectedDate } from '../redux/ducks/sessions';
import { setConfirmedSeat, setReservedSeats, setSelectedSeat } from '../redux/ducks/seats';
import { SelectDateProps } from '../types';
import { StyledLink } from '../styled/GlobalStyles';
import { BoxStyled, MenuItemStyled } from '../styled/SelectDateStyled';

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
        <BoxStyled component="form">
            <TextField
                color="secondary"
                label="Select date"
                select
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth
            >
                {date.map((item: string) => (
                    <MenuItemStyled value={item} key={item} aria-hidden="true">
                        <StyledLink to="session_list">{item}</StyledLink>
                    </MenuItemStyled>
                ))}
            </TextField>
        </BoxStyled>
    );
};

export default SelectDate;
