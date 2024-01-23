import React from 'react';

import LoaderSpinner from './LoaderSpinner';
import StyledPageLoader from '../styled/PageLoaderStyled';

function PageLoader() {
    return (
        <StyledPageLoader>
            <LoaderSpinner />
        </StyledPageLoader>
    );
}

export default PageLoader;
