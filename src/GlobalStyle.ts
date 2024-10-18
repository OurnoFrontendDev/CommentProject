import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    
    :root {
        --border-for-comment-element: 1px solid #00bfff;
        --font-weight-text-large: 600;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
    }
`;
