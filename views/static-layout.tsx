import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Head from "next/head";

export function RenderStaticLayout({ html }) {
  const [newHtml, setNewHtml] = useState();

  function hydrateHtml(html) {
    setNewHtml(html);
  }

  useEffect(() => {
    let host = window.location.host;
    let isDev = host.includes("localhost");
    let splitHost = host.split(".");
    let pageName;

    if (
      (isDev && splitHost.length === 2) ||
      (!isDev && splitHost.length === 3)
    ) {
      pageName = splitHost[0];
      if (pageName) {
        const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
          cluster: "us2"
        });
        const channel = pusher.subscribe(pageName);
        channel.bind("hydrate-html", hydrateHtml);
        console.log(channel);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Static Fun</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main dangerouslySetInnerHTML={{ __html: newHtml || html }}></main>
      <style jsx>{`
        main {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
