import React from 'react';
import PropTypes from 'prop-types';

function ConfirmSeat({ selectedSeat, onReservedSeat, error }) {
    return (
        <>
            <h2>Selected Seat: {selectedSeat}</h2>
            <button type="button" onClick={onReservedSeat}>
                Reserved Seat
            </button>
            {error && <p>{error}</p>}
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
