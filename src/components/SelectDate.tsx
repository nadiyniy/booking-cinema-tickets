/* eslint-disable react/button-has-type */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, MenuItem, TextField } from '@mui/material';

import { StyledLink } from '../styled/GlobalStyles';
import { selectSessionsDate } from '../redux/ducks/sessions';
import { SelectDateProps } from '../types';

const SelectDate = ({ handleDateChange, selectedDate }: SelectDateProps) => {
    const dispatch = useDispatch();
    const date = useSelector(selectSessionsDate);

    useEffect(() => {
        dispatch({ type: 'LOAD_DATE' });
    }, []);

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
