/* eslint-disable import/no-cycle */
import React from 'react';
import PropTypes from 'prop-types';

import { Typography, IconButton, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ConfirmSeat, SeatList, PageLoader } from './index';

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
