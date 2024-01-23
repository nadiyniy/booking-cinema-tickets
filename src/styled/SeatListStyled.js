import { Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import RootTheme from './RootTheme';

const { primary, primaryWhite, primaryWhiteChoice, primaryHover, primaryWhiteSelected } = RootTheme.colors;

const SeatListItem = styled(Paper)(({ theme, reserved, selected }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? primary : primaryWhite,
    ...theme.typography.body2,
    pointerEvents: reserved === 'true' ? 'none' : 'auto',
    padding: theme.spacing(2),
    background: reserved === 'true' && primaryWhiteChoice,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? primaryHover : primaryWhiteSelected,
    },

    ...(selected && {
        backgroundColor: primaryWhiteSelected,
    }),
}));

export default SeatListItem;
