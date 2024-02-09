import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

import { SeatListStyledProps } from '../types';
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
        cursor: 'pointer',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? primaryHover : primaryWhiteSelected
        },

        ...(selected && {
            backgroundColor: primaryWhiteSelected
        })
    };
});

export const BoxStyled = styled(Box)`
    flex-grow: 1;
`;

export default SeatListItem;
