import type { AppProps } from 'next/app';
import Script from "next/script";
import React from 'react';

export default function App({ Component, pageProps }: AppProps & Props) {
  const [origin, setOrigin] = React.useState("");
  const [tenant, setTenant] = React.useState("");

  React.useEffect(() => {
    const hostname = window.location.hostname;
    console.log(hostname);
    setOrigin(hostname);

    const tenant = hostname.split('.')[0];
    console.log(tenant);
    setTenant(tenant);
  }, [])

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          height: 100%;
          width: 100%;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol";
          height: 100%;
          max-width: 100vw;
          overflow: hidden;
        }
      `}</style>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${''}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${''}');
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
