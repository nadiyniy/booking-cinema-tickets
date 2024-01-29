import StyledLoader from '../styled/LoaderSpinnerStyled';

const LoaderSpinner = () => (
    <StyledLoader>
        <div className="lds-default">
            {[...Array(12)].map((_, index) => (
                <div key={index} />
            ))}
        </div>
    </StyledLoader>
);

export default LoaderSpinner;
