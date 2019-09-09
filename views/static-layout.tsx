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
