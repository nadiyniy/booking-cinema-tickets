import styled from 'styled-components';

export const StyledContent = styled.div`
    @media screen and (min-width: 768.98px) {
        display: flex;
        gap: 20px;
    }
    img {
        display: block;

        margin: 0 auto;
        margin-top: 10px;
        box-shadow: 0px 0px 5px 2px white;
    }

    div {
        @media screen and (min-width: 768.98px) {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
        }
        h2 {
            font-size: 20px;
            border-bottom: 2px solid black;
        }
    }
`;
