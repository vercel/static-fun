import Head from "next/head";
export function RenderStaticLayout({ html }) {
  return (
    <>
      <Head>
        <title>Static Fun</title>
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
      </Head>
      <main dangerouslySetInnerHTML={{ __html: html }}></main>
      <style jsx>{`
        main {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
