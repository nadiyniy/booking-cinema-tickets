import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
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
        margin: 0;
        border: 0;
        font-size: 100%;
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
        padding-bottom: 20px;
        height: 100vh;
    }
    ol,
    ul {
        list-style: none;
        padding: 0;
    }
    button {
        display: block;
        cursor: pointer;
        padding: 0;
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
        border-spacing: 0;
    }

    img,
    svg {
        display: block;
        max-width: 100%;
        height: auto;
    }
`;

export default GlobalStyles;
