import DoneIcon from '@mui/icons-material/Done';
import React from 'react';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function ConfirmSeat({ selectedSeat, onReservedSeat, error }) {
    return (
        <>
            <h2>Selected Seat: {selectedSeat}</h2>
            <Button variant="contained" type="button" onClick={onReservedSeat} endIcon={<DoneIcon />}>
                Reserved Seat
            </Button>
            {error && (
                <Typography variant="h4" color="red">
                    {error}
                </Typography>
            )}
        </>
    );
}

export default ConfirmSeat;

ConfirmSeat.propTypes = {
    selectedSeat: PropTypes.string,
    onReservedSeat: PropTypes.func.isRequired,
    error: PropTypes.string,
};

ConfirmSeat.defaultProps = {
    selectedSeat: '',
    error: null,
};
