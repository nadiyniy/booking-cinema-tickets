import React from 'react';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import StyledPageLoader from './StyledPageLoader';

function PageLoader() {
    return (
        <StyledPageLoader>
            <LoaderSpinner />
        </StyledPageLoader>
    );
}

export default PageLoader;
