import { Html, Head, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  )
}

export default Document;
