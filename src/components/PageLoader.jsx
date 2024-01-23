import React from 'react';

import LoaderSpinner from './LoaderSpinner';
import StyledPageLoader from '../styled/PageLoaderStyled';

const PageLoader = () => (
    <StyledPageLoader>
        <LoaderSpinner />
    </StyledPageLoader>
);

export default PageLoader;
