/* eslint-disable react/no-array-index-key */
import React from 'react';
import StyledLoader from './StyledLoaderSpinner';

function LoaderSpinner() {
    return (
        <StyledLoader>
            <div className="lds-default">
                {[...Array(12)].map((_, index) => (
                    <div key={index} />
                ))}
            </div>
        </StyledLoader>
    );
}

export default LoaderSpinner;
