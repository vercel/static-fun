import { useEffect, useRef, useState } from "react";

import EditLinkModal from "./edit-link-modal";
import SaveBar from "./save-bar";

export default function EditorContainer({ html, email, editLink }) {
  const [_html, setHtml] = useState(html || "");
  const [_email, setEmail] = useState(email);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="root-editor-container">
      <EditLinkModal
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        email={_email}
        setEmail={setEmail}
        editLink={editLink}
      />
      <div className="editor-container">
        <Editor
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
          flex: 1 0 50%;
          background: #22222;
        }
        .output-container {
          flex: 1 0 50%;
          height: 100%;
          width: 100%;
          -webkit-overflow-scrolling: touch;
          overflow-y: scroll;
          font-size: 0;
        }
        @media (max-width: 500px) {
          .root-editor-container {
            flex-direction: column;
          }
          .editor-container {
            flex: 1 0 50%;
            height: 50%;
            order: 1;
          }
          .output-container {
            flex: 1 0 50%;
            height: 50%;
            order: 0;
          }
        }
      `}</style>
    </div>
  );
}

function Editor({ html, email, setHtml, setDialogOpen }) {
  const [saveState, setSaveState] = useState();
  const [showEditLink, setShowEditLink] = useState(false);

  function onChange(e) {
    setHtml(e.target.value);
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
        showEditLink={showEditLink}
        setShowEditLink={setShowEditLink}
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
          -webkit-touch-callout: none;
          -khtml-user-select: none;
          -webkit-tap-highlight-color: transparent;
          -webkit-overflow-scrolling: touch;
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
    <iframe ref={iframeRef} title="html-output">
      <style jsx>{`
        iframe {
          height: 100%;
          width: 100%;
          border: none;
        }
      `}</style>
    </iframe>
  );
}
