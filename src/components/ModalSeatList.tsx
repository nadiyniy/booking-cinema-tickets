import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, DialogContent, DialogTitle, Dialog } from '@mui/material';

import { ConfirmSeat, SeatList, PageLoader } from '.';

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
import { IconButtonStyled, DialogActionsStyled } from '../styled/ModalSeatListStyled';

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
            <DialogTitle align="center" id="customized-dialog-title">
                Seats for {selectedSession}
            </DialogTitle>
            {isLoading && !selectedSeat ? (
                <PageLoader />
            ) : (
                <>
                    <IconButtonStyled aria-label="close" onClick={handleClose}>
                        <CloseIcon />
                    </IconButtonStyled>
                    <DialogContent dividers>
                        <SeatList reservedSeat={reservedSeat} selectedSeat={selectedSeat} seats={seats} />
                    </DialogContent>
                    <DialogActionsStyled>
                        <ConfirmSeat selectedSeat={selectedSeat} onReservedSeat={onReservedSeat} error={errorSeat} />
                        {confirmSeat && !errorSeat && (
                            <Typography variant="h4">
                                {reservedSeat} {confirmSeat}
                            </Typography>
                        )}
                    </DialogActionsStyled>
                </>
            )}
        </Dialog>
    );
};

export default ModalSeatList;
