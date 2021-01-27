import React from 'react';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const theme = { ...db.theme }; /* {
  colors: {
    primary: '#0070f3',
  },
} */

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* https://metatags.io/ */}
        <title>Alura Quiz</title>
        <meta name="title" content="Alura Quiz" />
        <meta name="description" content="Projeto da imersão React 2 Edição - Nextjs" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aluraquiz.ccarneiro.vercel.app/" />
        <meta property="og:title" content="Alura Quiz" />
        <meta property="og:description" content="Projeto da imersão React 2 Edição - Nextjs" />
        <meta property="og:image" content="https://vercel.com/edb13c85-65ba-4c36-a9dc-fca8a73d9fce" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aluraquiz.ccarneiro.vercel.app/" />
        <meta property="twitter:title" content="Alura Quiz" />
        <meta property="twitter:description" content="Projeto da imersão React 2 Edição - Nextjs" />
        <meta property="twitter:image" content="https://vercel.com/edb13c85-65ba-4c36-a9dc-fca8a73d9fce" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
