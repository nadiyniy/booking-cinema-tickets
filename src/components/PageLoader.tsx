import LoaderSpinner from './LoaderSpinner';
import { Container } from '@mui/material';

const PageLoader = () => (
    <Container sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', mt: '20px', mb: '20px' }}>
        <LoaderSpinner />
    </Container>
);

export default PageLoader;
