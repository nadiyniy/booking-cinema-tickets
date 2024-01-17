import React from 'react';
import PropTypes from 'prop-types';

const SelectDate = ({ handleDateChange, selectedDate }) => {
	return (
		<>
			<label>
				Select Date:
				<input type="date" onChange={handleDateChange} value={selectedDate || ''} />
			</label>
		</>
	);
};

export default SelectDate;

SelectDate.propTypes = {
	handleDateChange: PropTypes.func.isRequired,
	selectedDate: PropTypes.string
};
