import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Grid, Box } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

function SeatList({ seats, handleSeatClick }) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid component="ul" container spacing={{ xs: 2, md: 2 }} columns={{ xs: 6 }}>
                {seats.map((seat) => (
                    <Grid component="li" item xs={2} sm={4} md={2} key={seat}>
                        <Item key={seat} sx={{ cursor: 'pointer' }} onClick={() => handleSeatClick(seat)}>
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
};

SeatList.defaultProps = {
    seats: '',
};
