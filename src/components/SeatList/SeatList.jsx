import React from 'react';
import PropTypes from 'prop-types';

const SeatList = ({ selectedSession, seats, handleSeatClick }) => {
	return (
		<>
			<h2>Seats for {selectedSession}</h2>
			<ul>
				{seats.map((seat) => (
					<li key={seat} onClick={() => handleSeatClick(seat)}>
						{seat}
					</li>
				))}
			</ul>
		</>
	);
};

export default SeatList;

SeatList.propTypes = {
	handleSeatClick: PropTypes.func.isRequired,
	selectedSession: PropTypes.string,
	seats: PropTypes.arrayOf(PropTypes.string)
};
