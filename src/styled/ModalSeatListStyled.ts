import { DialogActions, IconButton } from '@mui/material';
import styled from 'styled-components';

export const IconButtonStyled = styled(IconButton)`
    && {
        position: absolute;
        right: 8px;
        top: 8px;
    }
`;

export const DialogActionsStyled = styled(DialogActions)`
    && {
        min-height: 150px;
        gap: 10px;
        justify-content: start;
        flex-direction: column;
    }
`;
