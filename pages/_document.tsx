import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="claim any subdomain and have fun!" />
        <meta property="og:title" content="Static Fun" />
        <meta
          property="og:description"
          content="claim any subdomain and have fun!"
        />
        <meta
          property="og:image"
          content="https://www.static.fun/twitter-card.png"
        />
        <meta property="og:url" content="https://www.static.fun" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
