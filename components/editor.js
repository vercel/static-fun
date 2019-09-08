import { useState, useEffect, useRef } from "react";
import EditLinkModal from "./edit-link-modal";
import SaveBar from "./save-bar";

export default function EditorContainer({ html, email, editLink }) {
  const [_html, setHtml] = useState(html || "");
  const [_email, setEmail] = useState(email);
  const [skip, setSkip] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="root-editor-container">
      <EditLinkModal
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        email={_email}
        setEmail={setEmail}
        html={_html}
        editLink={editLink}
        skip={skip}
        setSkip={setSkip}
      />
      <div className="editor-container">
        <Editor
          skip={skip}
          html={_html}
          email={_email}
          setHtml={setHtml}
          setDialogOpen={setDialogOpen}
        />
      </div>
      <div className="output-container">
        <OutputContainer content={_html} />
      </div>

      <style jsx>{`
        .root-editor-container {
          display: flex;
          height: 100%;
          width: 100%;
          margin: 0;
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
        @media (max-width: 500px) {
          .root-editor-container {
            flex-direction: column;
          }
          .editor-container {
            height: 50%;
            order: 1;
          }
          .output-container {
            height: 50%;
            order: 0;
          }
        }
      `}</style>
    </div>
  );
}

function Editor({ html, email, setHtml, setDialogOpen, skip }) {
  const [saveState, setSaveState] = useState();

  function onChange(e) {
    setHtml(e.target.value);
    if (!email && !skip) {
      setDialogOpen(true);
    }
    if (saveState === "SUCCESS") {
      setSaveState("DEFAULT");
    }
  }
  return (
    <div>
      <SaveBar
        setDialogOpen={setDialogOpen}
        html={html}
        saveState={saveState}
        setSaveState={setSaveState}
      />
      <textarea value={html} onChange={onChange} />
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
        }
        textarea {
          width: 100%;
          height: 100%;
          background: #222222;
          color: #fff;
          font-family: Menlo, monospace;
          font-size: 16px;
          padding: 24px;
          border: none;
          resize: none;
        }
        @media (max-width: 500px) {
          textarea {
            font-size: 12px;
          }
          div {
            z-index: 1000;
          }
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
        iframe {
          height: 100%;
          width: 100%;
          border: none;
        }
        @media (max-width: 500px;) {
          height: 50%;
        }
      `}</style>
    </iframe>
  );
}
