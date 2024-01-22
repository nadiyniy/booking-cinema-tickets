import React from 'react';
import PropTypes from 'prop-types';

import { Button, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

function ConfirmSeat({ selectedSeat, onReservedSeat, error, isLoading }) {
    return (
        <>
            <h2>Selected Seat: {selectedSeat}</h2>

            <Button
                variant="contained"
                type="button"
                onClick={onReservedSeat}
                endIcon={<DoneIcon />}
                disabled={isLoading}
            >
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
    isLoading: PropTypes.bool.isRequired,
};

ConfirmSeat.defaultProps = {
    selectedSeat: '',
    error: null,
};
