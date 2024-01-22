/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { SessionList, PageLoader, Layout, ModalSeatList, Home } from './components/index.js';
import { getReservationsSeat, getSessionDetails, getSessions } from './services/api.js';

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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedDate) {
            setIsLoading(true);

            getSessions()
                .then((data) => setSessions(data.sessions))
                .finally(() => setIsLoading(false));
        } else {
            navigate('/');
        }
    }, [selectedDate]);

    useEffect(() => {
        if (selectedSession) {
            setIsLoading(true);
            getSessionDetails()
                .then((data) => setSeats(data.seats))
                .finally(() => setIsLoading(false));
        }
    }, [selectedSession]);

    const onReservedSeat = async () => {
        if (reservedSeat.includes(selectedSeat)) {
            setErrorSeat('This seat is already reserved.');
        } else {
            try {
                setIsLoading(true);
                const data = await getReservationsSeat();
                setConfirmSeat(data.message);
                setReservedSeat([...reservedSeat, selectedSeat]);
                setErrorSeat(null);
            } catch (error) {
                setErrorSeat(error.message);
            } finally {
                setIsLoading(false);
            }
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
        setErrorSeat(null);
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
                        isLoading ? (
                            <PageLoader />
                        ) : (
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
                        )
                    }
                />
                <Route
                    path="/session_details"
                    element={
                        selectedSession && (
                            <ModalSeatList
                                isLoading={isLoading}
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
