/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { getReservationsSeat, getSessionDetails, getSessions } from './services/api.js';
import SessionList from './components/SessionList/SessionList.jsx';
import Home from './components/Home/Home.jsx';
import ModalSeatList from './components/ModalSeatList/ModalSeatList.jsx';
import Layout from './components/Layout/Layout.jsx';

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
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedDate) {
            getSessions().then((data) => setSessions(data.sessions));
        } else {
            navigate('/');
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
        navigate('/');
    };

    return (
        <Routes>
            <Route path="/" element={<Layout handleDateChange={handleDateChange} selectedDate={selectedDate} />}>
                <Route index element={<Home />} />
                <Route
                    path="/session_list"
                    element={
                        selectedDate && (
                            <Container>
                                <SessionList
                                    handleClickOpen={handleClickOpen}
                                    selectedDate={selectedDate}
                                    sessions={sessions}
                                    handleSessionClick={handleSessionClick}
                                />
                            </Container>
                        )
                    }
                />
                <Route
                    path="/session_details"
                    element={
                        selectedSession && (
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
                        )
                    }
                />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
