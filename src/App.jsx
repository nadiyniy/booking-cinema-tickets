/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import { getReservationsSeat, getSessionDetails, getSessions } from './services/api.js';
import SelectDate from './components/SelectDate/SelectDate.jsx';
import SessionList from './components/SessionList/SessionList.jsx';
import CinemaLogo from './images/cinema-logo1.svg';
import Home from './components/Home/Home.jsx';
// import Div from './StyleApp.jsx';
import ModalSeatList from './components/ModalSeatList/ModalSeatList.jsx';

function App() {
    const [selectedDate, setSelectedDate] = useState('');
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [reservedSeat, setReservedSeat] = useState([]);
    const [confirmSeat, setConfirmSeat] = useState(null);
    const [errorSeat, setErrorSeat] = useState(null);
    const [open, setOpen] = useState(false);

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
                setConfirmSeat(data.message);
                setReservedSeat([...reservedSeat, selectedSeat]);
                setErrorSeat(null);
            });
        }
    };
    const handleDateChange = (event) => {
        setSelectedSeat(null);
        setConfirmSeat(null);
        setReservedSeat([]);
        setSelectedDate(event.target.value);
    };

    const handleSessionClick = (session) => {
        setSelectedSeat(null);
        setConfirmSeat(null);
        setReservedSeat([]);
        setSelectedSession(session);
        setOpen(true);
    };

    const handleSeatClick = (seat) => {
        setSelectedSeat(seat);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar sx={{ justifyContent: 'space-between', color: 'peach' }}>
                        <img src={CinemaLogo} alt="logo" width="150" />
                        <SelectDate handleDateChange={handleDateChange} selectedDate={selectedDate} />
                    </Toolbar>
                </Container>
            </AppBar>
            {!selectedDate && <Home />}
            {selectedDate && (
                <Container>
                    <SessionList
                        handleClickOpen={handleClickOpen}
                        selectedDate={selectedDate}
                        sessions={sessions}
                        handleSessionClick={handleSessionClick}
                    />
                </Container>
            )}
            {selectedSession && (
                <ModalSeatList
                    confirmSeat={confirmSeat}
                    selectedSeat={selectedSeat}
                    onReservedSeat={onReservedSeat}
                    errorSeat={errorSeat}
                    open={open}
                    handleClose={handleClose}
                    handleClickOpen={handleClickOpen}
                    setSelectedSeat={setSelectedSeat}
                    selectedSession={selectedSession}
                    seats={seats}
                    handleSeatClick={handleSeatClick}
                />
            )}
        </>
    );
}

export default App;
