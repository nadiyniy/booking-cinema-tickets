import { experimentalStyled as styled } from '@mui/material/styles';
import { Paper, Typography } from '@mui/material';

import RootTheme from './RootTheme';

const { primary, primaryWhite, primaryHover, primaryWhiteSelected } = RootTheme.colors;

const SessionListItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? primary : primaryWhite,
    ...theme.typography.body2,
    padding: 0,
    textAlign: 'center',
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? primaryHover : primaryWhiteSelected
    }
}));

export const TypographyStyled = styled(Typography)`
    margin: 20px 0;
`;

export default SessionListItem;
