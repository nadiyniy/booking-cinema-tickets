import React from 'react';
import PropTypes from 'prop-types';

const ConfirmSeat = ({ selectedSeat, handleBookSeat, errorSeat, className }) => {
	return (
		<>
			<h2 className={className.title}>Selected Seat: {selectedSeat}</h2>
			<button className={className.button} onClick={handleBookSeat}>
				Reserved Seat
			</button>
			{errorSeat && <p>{errorSeat}</p>}
		</>
	);
};

export default ConfirmSeat;

ConfirmSeat.propTypes = {
	handleSeatClick: PropTypes.func,
	selectedSession: PropTypes.string,
	seats: PropTypes.string,
	className: PropTypes.shape({
		title: PropTypes.string,
		button: PropTypes.string
	})
};
