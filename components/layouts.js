import Head from "next/head";

export function FixedCenterLayout({ children, title }) {
  return (
    <main>
      <Head>
        <title>{title || "Static Fun"}</title>
      </Head>
      {children}
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
}
