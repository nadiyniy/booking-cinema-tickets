import { Typography, IconButton, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { ConfirmSeat, SeatList, PageLoader } from './index';
import { ModalSeatListProps } from '../types';
import {
    selectConfirmSeat,
    selectErrorSeat,
    selectIsLoading,
    selectReservedSeat,
    selectSeats,
    selectSelectedSeat,
    setErrorSeat,
    setReservedSeats,
    setSelectedSeat
} from '../redux/ducks/seats';
import { selectSessions } from '../redux/ducks/sessions';
import { useNavigate } from 'react-router-dom';

const ModalSeatList = ({ open, setOpen }: ModalSeatListProps) => {
    const isLoading: boolean = useSelector(selectIsLoading);
    const selectedSession: string = useSelector(selectSessions);
    const seats: string[] = useSelector(selectSeats);
    const confirmSeat: string = useSelector(selectConfirmSeat);
    const errorSeat: string | null = useSelector(selectErrorSeat);
    const selectedSeat = useSelector(selectSelectedSeat);
    const reservedSeat = useSelector(selectReservedSeat);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessionDetails = async () => {
            if (selectedSession) {
                try {
                    dispatch({ type: 'GET_SEATS' });
                } catch {
                    console.error('Failed to fetch session details');
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
                dispatch({ type: 'LOAD_SEAT_R' });
                dispatch(setReservedSeats([...reservedSeat, selectedSeat]));
                dispatch(setErrorSeat(null));
            } catch (error: any) {
                dispatch(setErrorSeat(error.message));
            } finally {
                dispatch(setSelectedSeat(''));
            }
        }
    };
    const handleSeatClick = (seat: string) => {
        dispatch(setSelectedSeat(seat));
    };

    const handleClose = () => {
        setErrorSeat(null);
        setOpen(false);
        navigate('/');
    };

    return (
        <Dialog maxWidth="md" fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle align="center" sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Seats for {selectedSession}
            </DialogTitle>
            {isLoading && !selectedSeat ? (
                <PageLoader />
            ) : (
                <>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <SeatList
                            reservedSeat={reservedSeat}
                            selectedSeat={selectedSeat}
                            seats={seats}
                            handleSeatClick={handleSeatClick}
                        />
                    </DialogContent>
                    <DialogActions
                        sx={{ flexDirection: 'column', gap: '10px', minHeight: '150px', justifyContent: 'start' }}
                    >
                        <ConfirmSeat selectedSeat={selectedSeat} onReservedSeat={onReservedSeat} error={errorSeat} />
                        {confirmSeat && !errorSeat && (
                            <Typography variant="h4">
                                {reservedSeat} {confirmSeat}
                            </Typography>
                        )}
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default ModalSeatList;
