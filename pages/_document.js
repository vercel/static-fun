import Document, { Html, Head, Main, NextScript } from "next/document";

class StaticFunDoc extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content="Static Fun" />
          <meta
            property="og:description"
            content="claim any subdomain and have fun!"
          />
          <meta
            property="og:image"
            content="https://www.static.fun/static/twitter-card.png"
          />
          <meta property="og:url" content="https://www.static.fun" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            defer
            src="https://cdn.simpleanalytics.io/hello.js"
          ></script>
        </body>
      </Html>
    );
  }
}

export default StaticFunDoc;
