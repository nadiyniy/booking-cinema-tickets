import DoneIcon from '@mui/icons-material/Done';
import { Button, Typography } from '@mui/material';

import { ConfirmSeatProps } from '../types';
import RootTheme from '../styled/RootTheme';

const ConfirmSeat = ({ selectedSeat, onReservedSeat, error }: ConfirmSeatProps) => (
    <>
        <h2 data-testid="ConfirmSeat-1">Selected Seat: {selectedSeat || 'chose seat'}</h2>
        <Button
            variant="contained"
            type="button"
            onClick={onReservedSeat}
            endIcon={<DoneIcon />}
            disabled={!selectedSeat}
        >
            Reserved Seat
        </Button>
        {error && (
            <Typography variant="h4" color={RootTheme.colors.primaryRed}>
                {error}
            </Typography>
        )}
    </>
);

export default ConfirmSeat;
