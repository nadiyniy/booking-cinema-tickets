import React from 'react';
import PropTypes from 'prop-types';

function SelectDate({ handleDateChange, selectedDate }) {
    return (
        <label htmlFor="select-date">
            Select Date:
            <input id="select-date" type="date" onChange={handleDateChange} value={selectedDate || ''} />
        </label>
    );
}

export default SelectDate;

SelectDate.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.string,
};
SelectDate.defaultProps = {
    selectedDate: '',
};
