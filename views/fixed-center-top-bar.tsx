import Head from "next/head";

import TopBar from "../components/top-bar";

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
