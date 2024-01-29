import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ConfirmSeat, SeatList, PageLoader } from './index';

import { selectSessions } from '../redux/ducks/sessions';
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
import { ModalSeatListProps } from '../types';

const ModalSeatList = ({ open, setOpen }: ModalSeatListProps) => {
    const isLoading: boolean = useSelector(selectIsLoading);
    const selectedSession: string = useSelector(selectSessions);
    const seats: string[] = useSelector(selectSeats);
    const confirmSeat: string = useSelector(selectConfirmSeat);
    const errorSeat: string | null = useSelector(selectErrorSeat);
    const selectedSeat: string = useSelector(selectSelectedSeat);
    const reservedSeat: string[] = useSelector(selectReservedSeat);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        selectedSession && dispatch({ type: 'GET_SEATS' });
    }, [selectedSession]);

    const onReservedSeat = () => {
        if (reservedSeat.includes(selectedSeat)) {
            dispatch(setErrorSeat('This seat is already reserved.'));
        } else {
            dispatch({ type: 'LOAD_SEAT_R' });
            dispatch(setReservedSeats([...reservedSeat, selectedSeat]));
            dispatch(setErrorSeat(null));
        }
        dispatch(setSelectedSeat(''));
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
                        <SeatList reservedSeat={reservedSeat} selectedSeat={selectedSeat} seats={seats} />
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
