import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';

import { setSelectedSeat } from '../redux/ducks/seats';
import { SeatListProps } from '../types';
import SeatListItem, { BoxStyled } from '../styled/SeatListStyled';

const SeatList = ({ seats, reservedSeat, selectedSeat }: SeatListProps) => {
    const dispatch = useDispatch();

    return (
        <BoxStyled>
            <Grid component="ul" container spacing={{ xs: 2, md: 2 }} columns={{ xs: 6 }}>
                {!!seats?.length &&
                    seats.map((seat) => (
                        <Grid component="li" item xs={2} sm={4} md={2} key={seat}>
                            <SeatListItem
                                selected={selectedSeat === seat}
                                reserved={reservedSeat.includes(seat).toString()}
                                key={seat}
                                onClick={() => dispatch(setSelectedSeat(seat))}
                            >
                                {seat}
                            </SeatListItem>
                        </Grid>
                    ))}
            </Grid>
        </BoxStyled>
    );
};

export default SeatList;
