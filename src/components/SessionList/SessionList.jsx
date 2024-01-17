import React from 'react';
import PropTypes from 'prop-types';

function SessionList({ selectedDate, sessions, handleSessionClick }) {
    return (
        <>
            <h2>Sessions for {selectedDate}</h2>
            <ul>
                {sessions.map((session) => (
                    <li key={session} onClick={() => handleSessionClick(session)} aria-hidden="true">
                        {session}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default SessionList;

SessionList.propTypes = {
    handleSessionClick: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.string),
};

SessionList.defaultProps = {
    sessions: [],
};
