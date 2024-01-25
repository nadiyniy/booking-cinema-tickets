import { Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import RootTheme from './RootTheme';

const { primary, primaryWhite, primaryHover, primaryWhiteSelected } = RootTheme.colors;

const SessionListItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? primary : primaryWhite,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? primaryHover : primaryWhiteSelected
    }
}));

export default SessionListItem;
