import { useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';

import { setSelectedSeat } from '../redux/ducks/seats';
import { SeatListProps } from '../types';
import SeatListItem from '../styled/SeatListStyled';

const SeatList = ({ seats, reservedSeat, selectedSeat }: SeatListProps) => {
    const dispatch = useDispatch();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid component="ul" container spacing={{ xs: 2, md: 2 }} columns={{ xs: 6 }}>
                {!!seats?.length &&
                    seats.map((seat) => (
                        <Grid component="li" item xs={2} sm={4} md={2} key={seat}>
                            <SeatListItem
                                selected={selectedSeat === seat}
                                reserved={reservedSeat.includes(seat).toString()}
                                key={seat}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => dispatch(setSelectedSeat(seat))}
                            >
                                {seat}
                            </SeatListItem>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default SeatList;
