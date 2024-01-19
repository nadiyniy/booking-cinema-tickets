import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ConfirmSeat from '../ConfirmSeat/ConfirmSeat';
import SeatList from '../SeatList/SeatList';
import PageLoader from '../PageLoader/PageLoader';

function ModalSeatList({
    isLoading,
    confirmSeat,
    selectedSession,
    seats,
    handleSeatClick,
    handleClose,
    open,
    selectedSeat,
    onReservedSeat,
    errorSeat,
}) {
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
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <SeatList seats={seats} selectedSession={selectedSession} handleSeatClick={handleSeatClick} />
                    </DialogContent>
                    {selectedSeat && (
                        <DialogActions sx={{ flexDirection: 'column', gap: '10px' }}>
                            <ConfirmSeat
                                isLoading={isLoading}
                                selectedSeat={selectedSeat}
                                onReservedSeat={onReservedSeat}
                                error={errorSeat}
                            />
                            {confirmSeat && !errorSeat && <Typography variant="h4">{confirmSeat}</Typography>}
                        </DialogActions>
                    )}
                </>
            )}
        </Dialog>
    );
}

export default ModalSeatList;

ModalSeatList.propTypes = {
    handleSeatClick: PropTypes.func.isRequired,
    selectedSession: PropTypes.string,
    seats: PropTypes.arrayOf(PropTypes.string),
    confirmSeat: PropTypes.string,
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    selectedSeat: PropTypes.string,
    onReservedSeat: PropTypes.func.isRequired,
    errorSeat: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
};

ModalSeatList.defaultProps = {
    selectedSession: '',
    seats: '',
    confirmSeat: '',
    handleClose: '',
    open: '',
    selectedSeat: '',
    errorSeat: '',
};
