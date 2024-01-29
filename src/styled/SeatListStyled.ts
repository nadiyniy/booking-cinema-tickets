import { experimentalStyled as styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

import { SeatListStyledProps } from '../types/SeatListStyledTypes';
import RootTheme from './RootTheme';

const { primary, primaryWhite, primaryWhiteChoice, primaryHover, primaryWhiteSelected } = RootTheme.colors;

const SeatListItem = styled(Paper)<SeatListStyledProps>(({ theme, reserved, selected }) => {
    const backgroundColorValue =
        reserved === 'true' ? primaryWhiteChoice : theme.palette.mode === 'dark' ? primary : primaryWhite;

    return {
        backgroundColor: backgroundColorValue,
        ...theme.typography.body2,
        pointerEvents: reserved === 'true' ? 'none' : 'auto',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? primaryHover : primaryWhiteSelected
        },

        ...(selected && {
            backgroundColor: primaryWhiteSelected
        })
    };
});

export default SeatListItem;
