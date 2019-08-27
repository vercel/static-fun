import { useState, useEffect, useRef } from "react";

export default function EditorContainer({ pageData }) {
  const [html, setHtml] = useState(pageData || "");

  return (
    <div className="container">
      <div className="editor-container">
        <Editor pageData={pageData} setHtml={setHtml} />
      </div>
      <div className="output-container">
        <OutputContainer content={html} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          height: 100%;
          width: 100%;
        }
        .editor-container {
          height: 100%;
          width: 100%;
          flex: 1;
        }
        .output-container {
          flex: 1;
          height: 100%;
          width: 100%;
        }
        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
}

function Editor({ pageData, setHtml }) {
  function onChange(e) {
    setHtml(e.target.innerText);
  }
  return (
    <div contentEditable="true" onInput={onChange}>
      {pageData}
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
          background: #000;
          color: #fff;
          font-family: Menlo, monospace;
          padding: 24px;
        }
      `}</style>
    </div>
  );
}

function OutputContainer({ content }) {
  const iframeRef = useRef();

  useEffect(() => {
    updateIframe();
  }, [content]);

  function updateIframe() {
    const document = iframeRef.current.contentDocument;
    const head = document.getElementsByTagName("head")[0];
    document.body.innerHTML = content || "";
  }
  return (
    <iframe ref={iframeRef} title="html-output">
      <style jsx>{`
        height: 100%;
        width: 100%;
      `}</style>
    </iframe>
  );
}
