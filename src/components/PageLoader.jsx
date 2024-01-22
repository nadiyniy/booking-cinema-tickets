import React from 'react';

import LoaderSpinner from './LoaderSpinner';
import StyledPageLoader from '../styled/StyledPageLoader';

function PageLoader() {
    return (
        <StyledPageLoader>
            <LoaderSpinner />
        </StyledPageLoader>
    );
}

export default PageLoader;
