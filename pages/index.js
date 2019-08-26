import { useEffect, useState } from "react";
import Head from "next/head";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function IndexPage() {
  const [pageData, setPageData] = useState(undefined);
  useEffect(() => {
    async function getPageData() {
      let isDev = window.location.host.includes("localhost");
      let splitHost = window.location.host.split(".");
      if (
        (!isDev && splitHost.length === 3) ||
        (isDev && splitHost.length === 2)
      ) {
        let page = splitHost[0];
        console.log("page", page);
        let res = await fetch(`/api/get-page?page=${page}`);
        let json = await res.json();
	console.log('json', json)
        setPageData(json.pageData);
      } else {
        setPageData(null);
      }
    }
    getPageData();
  }, []);
  if (typeof pageData === "undefined") {
    return (
      <main>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
          <meta
            name="description"
            content="claim a wildcard subdomain and have fun!"
          />
          <link rel="icon" href="/favicon.ico" />
          <title>Static Fun</title>
        </Head>
        <PacmanLoader loading={typeof pageData === "undefined"} />
        <style jsx>{`
          main {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}</style>
      </main>
    );
  } else if (pageData === null) {
    return (
      <main>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
          <meta
            name="description"
            content="claim a wildcard subdomain and have fun!"
          />
          <link rel="icon" href="/favicon.ico" />
          <title>Static Fun</title>
        </Head>
        <p>Welcome to static.fun</p>
        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
          }
          main {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 62.5%;
            font-size: 1.6rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
              Helvetica, Arial, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol";
            background: #fff;
            color: #000;
          }
        `}</style>
      </main>
    );
  } else {
    return (
      <main>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
          <meta
            name="description"
            content="claim a wildcard subdomain and have fun!"
          />
          <link rel="icon" href="/favicon.ico" />
          <title>Static Fun</title>
        </Head>
	<div dangerouslySetInnerHTML={{__html: pageData}}/>
        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
          }
          main {
           font-size: 62.5%;
            font-size: 1.6rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
              Helvetica, Arial, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol";
            background: #fff;
            color: #000;
          }
        `}</style>
      </main>
    );
  }
}
