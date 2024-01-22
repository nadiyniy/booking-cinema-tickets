import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Grid, Box } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

function SeatList({ seats, handleSeatClick, reservedSeat, selectedSeat }) {
    const Item = styled(Paper)(({ theme, reserved, isSelected }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        pointerEvents: reserved === 'true' ? 'none' : 'auto',
        padding: theme.spacing(2),
        background: reserved === 'true' && '#e3e0e0',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#33404d' : '#f5f5f5',
        },

        ...(isSelected && {
            backgroundColor: '#f5f5f5',
        }),
    }));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid component="ul" container spacing={{ xs: 2, md: 2 }} columns={{ xs: 6 }}>
                {seats.map((seat) => (
                    <Grid component="li" item xs={2} sm={4} md={2} key={seat}>
                        <Item
                            isSelected={selectedSeat === seat}
                            reserved={reservedSeat.includes(seat).toString()}
                            key={seat}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleSeatClick(seat)}
                        >
                            {seat}
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

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
