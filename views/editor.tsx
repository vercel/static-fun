import EditorContainer from "../components/editor";
import TopBar from "../components/top-bar";

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
