import Head from "next/head";

import EditorContainer from "./editor";
import TopBar from "./top-bar";

export function FixedCenterLayout({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <main>
      <Head>
        <title>{title || "Static Fun"}</title>
      </Head>
      <div className="children-container">{children}</div>
      <style jsx>{`
        html {
          background: none;
        }
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

export function FixedCenterLayoutTopBar({ children, title }) {
  return (
    <main>
      <Head>
        <title>{title || "Static Fun"}</title>
      </Head>
      <TopBar />
      <div className="children-container">{children}</div>
      <style jsx>{`
        html {
          background: none;
        }
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
