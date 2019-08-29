import { useState, useEffect, useRef } from "react";
import SaveDialog from "./save-dialog";

export default function EditorContainer({ pageData }) {
  const [html, setHtml] = useState(pageData || "");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  return (
    <div className="container">
      <SaveDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        setEmailSaved={setEmailSaved}
      />
      <div className="editor-container">
        <Editor
          pageData={pageData}
          setHtml={setHtml}
          emailSaved={emailSaved}
          setDialogOpen={setDialogOpen}
        />
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

function Editor({ pageData, setHtml, setDialogOpen, emailSaved }) {
  function onChange(e) {
    setHtml(e.target.value);
    if (!emailSaved) {
      setDialogOpen(true);
    }
  }
  return (
    <div>
      <textarea contentEditable="true" onChange={onChange}>
        {pageData}
      </textarea>
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
        }
        textarea {
          width: 100%;
          height: 100%;
          background: #000;
          color: #fff;
          font-family: Menlo, monospace;
          font-size: 16px;
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
