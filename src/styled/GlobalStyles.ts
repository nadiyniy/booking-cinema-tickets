import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

import RootTheme from './RootTheme';

export const GlobalStyles = createGlobalStyle`
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: ${RootTheme.sizes.size_0};
        border: ${RootTheme.sizes.size_0};
        font-size: ${RootTheme.sizes.size_100};
        font: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }
    body {
        font-family: 'Manrope', sans-serif;
        box-sizing: border-box;
        background-image: url(/home.jpg);
        background-position: center;
        background-size: cover;
        background-attachment: fixed;
        padding-bottom: ${RootTheme.sizes.pixel_20};
        height: ${RootTheme.sizes.size_100vh};
    }
    ol,
    ul {
        list-style: none;
        padding: ${RootTheme.sizes.size_0};
    }
    button {
        display: block;
        cursor: pointer;
        padding: ${RootTheme.sizes.size_0};
    }
    a {
        text-decoration: none;
        color: inherit;
    }

    blockquote,
    q {
        quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: ${RootTheme.sizes.size_0};
    }

    img,
    svg {
        display: block;
        max-width: ${RootTheme.sizes.size_100};
        height: auto;
    }
`;

export const StyledLink = styled(Link)`
    display: block;
    text-decoration: none;
    color: inherit;
    width: ${RootTheme.sizes.size_100};
    padding: ${RootTheme.sizes.pixel_5} ${RootTheme.sizes.pixel_10};
`;

export default GlobalStyles;
