import React from 'react';
import PropTypes from 'prop-types';

import { Button, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import RootTheme from '../styled/RootTheme';
import { ConfirmSeatProps } from '../types/ConfirmSeat';

const ConfirmSeat = ({ selectedSeat, onReservedSeat, error }: ConfirmSeatProps) => (
    <>
        <h2>Selected Seat: {selectedSeat || 'chose seat'}</h2>

        <Button
            variant="contained"
            type="button"
            onClick={onReservedSeat}
            endIcon={<DoneIcon />}
            disabled={!selectedSeat}
        >
            Reserved Seat
        </Button>
        {error && (
            <Typography variant="h4" color={RootTheme.colors.primaryRed}>
                {error}
            </Typography>
        )}
    </>
);

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
