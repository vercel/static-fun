import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Head from "next/head";

export function RenderStaticLayout({ html }) {
  const [newHtml, setNewHtml] = useState();

  function hydrateHtml() {}

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: "us2"
    });
  }, []);

  return (
    <>
      <Head>
        <title>Static Fun</title>
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
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
