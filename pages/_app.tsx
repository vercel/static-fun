import Head from "next/head";
import App from "next/app";
import React from "react";
import Sentry from "../lib/sentry-browser";

export default class StaticFunApp extends App {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope(scope => {
      scope.setExtra("componentStack", errorInfo.componentStack);
      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
          <meta
            name="description"
            content="claim any subdomain and have fun!"
          />
        </Head>
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
            height: 100vh;
            width: 100vw;
            overflow: none;
          }
        `}</style>
        <Component {...pageProps} />
      </>
    );
  }
}
