import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, MenuItem, TextField } from '@mui/material';

import { getDate } from '../services/api';
import { StyledLink } from '../styled/GlobalStyles';

const SelectDate = ({ handleDateChange, selectedDate }) => {
    const [date, setDate] = useState([]);

    useEffect(() => {
        getDate().then((data) => setDate(data.date));
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
