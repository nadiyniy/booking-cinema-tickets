/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '@mui/material';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { SessionList, PageLoader, Layout, ModalSeatList, Home } from './components/index.js';
import { getReservationsSeat, getSessionDetails, getSessions } from './services/api.js';
import {
    setSelectedDate,
    setSelectedSession,
    setSessions,
    selectAllSessions,
    selectDate,
    selectSessions,
} from './redux/ducks/sessions.js';
import {
    setConfirmedSeat,
    setErrorSeat,
    setReservedSeats,
    setSeats,
    setSelectedSeat,
    selectConfirmSeat,
    selectErrorSeat,
    selectReservedSeat,
    selectSeats,
    selectSelectedSeat,
} from './redux/ducks/seats.js';

function App() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const sessions = useSelector(selectAllSessions);
    const selectedDate = useSelector(selectDate);
    const selectedSession = useSelector(selectSessions);
    const seats = useSelector(selectSeats);
    const selectedSeat = useSelector(selectSelectedSeat);
    const reservedSeat = useSelector(selectReservedSeat);
    const confirmSeat = useSelector(selectConfirmSeat);
    const errorSeat = useSelector(selectErrorSeat);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (selectedDate) {
                setIsLoading(true);
                try {
                    const data = await getSessions();
                    dispatch(setSessions(data.sessions));
                } finally {
                    setIsLoading(false);
                }
            } else {
                navigate('/');
            }
        };

        fetchData();
    }, [selectedDate]);

    useEffect(() => {
        const fetchSessionDetails = async () => {
            if (selectedSession) {
                setIsLoading(true);

                try {
                    const data = await getSessionDetails();
                    dispatch(setSeats(data.seats));
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchSessionDetails();
    }, [selectedSession]);

    const onReservedSeat = async () => {
        if (reservedSeat.includes(selectedSeat)) {
            dispatch(setErrorSeat('This seat is already reserved.'));
        } else {
            try {
                setIsLoading(true);
                const data = await getReservationsSeat();
                dispatch(setConfirmedSeat(data.message));
                dispatch(setReservedSeats([...reservedSeat, selectedSeat]));
                dispatch(setErrorSeat(null));
            } catch (error) {
                dispatch(setErrorSeat(error.message));
            } finally {
                setIsLoading(false);
                dispatch(setSelectedSeat(null));
            }
        }
    };

    const handleDateChange = (event) => {
        dispatch(setSelectedSeat(null));
        dispatch(setConfirmedSeat(null));
        dispatch(setReservedSeats([]));

        dispatch(setSelectedDate(event.target.value));
    };

    const handleSessionClick = (session) => {
        dispatch(setSelectedSeat(null));
        dispatch(setConfirmedSeat(null));
        dispatch(setReservedSeats([]));
        dispatch(setSelectedSession(session));

        setOpen(true);
    };

    const handleSeatClick = (seat) => {
        dispatch(setSelectedSeat(seat));
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
                                reservedSeat={reservedSeat}
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
