import React, { useState, useEffect } from 'react';
import { getReservationsSeat, getSessionDetails, getSessions } from './services/api';
import SelectDate from './components/SelectDate/SelectDate';
import SessionList from './components/SessionList/SessionList';
import SeatList from './components/SeatList/SeatList';
import ConfirmSeat from './components/ConfirmSeat/ConfirmSeat';

function App() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [reservedSeat, setReservedSeat] = useState([]);
    const [confirmSeat, setConfirmSeat] = useState(null);
    const [errorSeat, setErrorSeat] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            getSessions().then((data) => setSessions(data.sessions));
        }
    }, [selectedDate]);

    useEffect(() => {
        if (selectedSession) {
            getSessionDetails().then((data) => setSeats(data.seats));
        }
    }, [selectedSession]);

    const onReservedSeat = () => {
        const body = JSON.stringify({
            session: selectedSession,
            seat: selectedSeat,
        });

        if (reservedSeat.includes(selectedSeat)) {
            setErrorSeat('This seat is already reserved.');
        } else {
            getReservationsSeat(body).then((data) => {
                setConfirmSeat(data);
                setReservedSeat([...reservedSeat, selectedSeat]);
                setErrorSeat(null);
            });
        }
    };
    const handleDateChange = (event) => {
        setReservedSeat([]);
        setSelectedDate(event.target.value);
    };

    const handleSessionClick = (session) => {
        setSelectedSession(session);
    };

    const handleSeatClick = (seat) => {
        setSelectedSeat(seat);
    };

    return (
        <div>
            <h1>Cinema Ticket Reservation</h1>
            <SelectDate handleDateChange={handleDateChange} selectedDate={selectedDate} />
            {selectedDate && (
                <SessionList selectedDate={selectedDate} sessions={sessions} handleSessionClick={handleSessionClick} />
            )}
            {selectedSession && (
                <SeatList selectedSession={selectedSession} seats={seats} handleSeatClick={handleSeatClick} />
            )}

            {selectedSeat && (
                <ConfirmSeat selectedSeat={selectedSeat} onReservedSeat={onReservedSeat} error={errorSeat} />
            )}

            {confirmSeat && !errorSeat && (
                <div>
                    <h2>{confirmSeat.message}</h2>
                </div>
            )}
        </div>
    );
}

export default App;
