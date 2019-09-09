import Head from "next/head";
import EditorContainer from "../components/editor";
import TopBar from "../components/top-bar";

export function EditorLayout({ html, email, editLink }) {
  return (
    <main>
      <Head>
        <title>Static Fun</title>
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
      </Head>
      <TopBar info />
      <EditorContainer html={html} email={email} editLink={editLink} />
      <style jsx>{`
        main {
          height: 100vh;
        }
      `}</style>
    </main>
  );
}
