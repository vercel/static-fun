import Head from "next/head";
import TopBar from "./top-bar";
import EditorContainer from "./editor";

export function FixedCenterLayout({ children, title }) {
  return (
    <main>
      <Head>
        <title>{title || "Static Fun"}</title>
      </Head>
      <TopBar>
        {`static.fun is a static hosting playground to demonstrate ZEIT's support of wildcard domains. To start, go to {your-own-page}.static.fun!`}
      </TopBar>
      <div className="children-container">{children}</div>
      <style jsx>{`
        .children-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </main>
  );
}

export function EditorLayout({ html, email, editLink }) {
  return (
    <main>
      <TopBar>
        {`static.fun is a static hosting playground to demonstrate ZEIT's support of wildcard domains. To start, go to {your-own-page}.static.fun!`}
      </TopBar>
      <EditorContainer html={html} email={email} editLink={editLink} />
      <style jsx>{`
        main {
          height: 100vh;
        }
      `}</style>
    </main>
  );
}

export function RenderStaticLayout({ html }) {
  return (
    <>
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
