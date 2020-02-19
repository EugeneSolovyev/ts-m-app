import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        font-family: 'Roboto';
        font-size: 16px;
    }

    html{
        min-height:100%;
        position:relative;
    }
    body{
        height:100%;
    }
    #root {
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        overflow:hidden;
    }

    header,
    footer {
        padding: 0 2rem;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }
`;
