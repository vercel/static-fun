import { useEffect, useRef, useState } from "react";

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
        dialogOpen={true}
        setDialogOpen={setDialogOpen}
        email={_email}
        setEmail={setEmail}
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
          height: calc(100% - 50px);
          width: 100%;
          margin: 0;
        }
        .editor-container {
          height: 100%;
          width: 100%;
          flex: 1;
          background: #22222;
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
            order: 0;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
          }
          .output-container {
            height: 50%;
            order: 1;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
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
      <textarea value={html} onChange={onChange} spellCheck={false} />
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
        }
        textarea {
          -webkit-appearance: none;
          width: 100%;
          height: calc(100% - 48px);
          background: #222222;
          color: #fff;
          font-family: Menlo, monospace;
          font-size: 16px;
          padding: 24px;
          border: none;
          border-radius: 0;
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
  const iframeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    updateIframe();
  }, [content]);

  function updateIframe() {
    const document = iframeRef.current.contentDocument;
    const head = document.getElementsByTagName("head")[0];
    document.body.innerHTML = content || "";
  }

  return (
    <iframe ref={iframeRef} title="html-output" scrolling="yes">
      <style jsx>{`
        iframe {
          height: 100%;
          width: 100%;
          overflow: scroll;
          border: none;
        }
        @media (max-width: 500px;) {
          height: 50%;
        }
      `}</style>
    </iframe>
  );
}
