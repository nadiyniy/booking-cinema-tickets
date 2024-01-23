/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Box, MenuItem, TextField } from '@mui/material';

import { StyledLink } from '../styled/GlobalStyles';
import { selectSessionsDate } from '../redux/ducks/sessions';

const SelectDate = ({ handleDateChange, selectedDate }) => {
    const dispatch = useDispatch();
    const date = useSelector(selectSessionsDate);

    useEffect(() => {
        dispatch({ type: 'LOAD_DATE' });
    }, []);

    return (
        <Box autoComplete="off" sx={{ minWidth: '200px', marginTop: '10px', marginBottom: '10px', height: '66px' }}>
            <TextField
                color="secondary"
                label="Select date"
                select
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth
            >
                {date.map((item) => (
                    <MenuItem sx={{ padding: '0' }} value={item} key={item} aria-hidden="true">
                        <StyledLink to="session_list">{item}</StyledLink>
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default SelectDate;

SelectDate.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.string,
};
SelectDate.defaultProps = {
    selectedDate: '',
};
