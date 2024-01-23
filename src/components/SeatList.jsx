import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Box } from '@mui/material';

import SeatListItem from '../styled/SeatListStyled';

const SeatList = ({ seats, handleSeatClick, reservedSeat, selectedSeat }) => (
    <Box sx={{ flexGrow: 1 }}>
        <Grid component="ul" container spacing={{ xs: 2, md: 2 }} columns={{ xs: 6 }}>
            {seats.map((seat) => (
                <Grid component="li" item xs={2} sm={4} md={2} key={seat}>
                    <SeatListItem
                        selected={selectedSeat === seat}
                        reserved={reservedSeat.includes(seat).toString()}
                        key={seat}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleSeatClick(seat)}
                    >
                        {seat}
                    </SeatListItem>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default SeatList;

SeatList.propTypes = {
    handleSeatClick: PropTypes.func.isRequired,
    seats: PropTypes.arrayOf(PropTypes.string),
    reservedSeat: PropTypes.arrayOf(PropTypes.string),
    selectedSeat: PropTypes.string,
};

SeatList.defaultProps = {
    seats: '',
    reservedSeat: [],
    selectedSeat: '',
};
