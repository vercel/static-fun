import { useState, useEffect, useRef } from "react";
import EditLinkModal from "./edit-link-modal";
import SaveBar from "./save-bar";

export default function EditorContainer({ html, email, editLink }) {
  const [_html, setHtml] = useState(html || "");
  const [_email, setEmail] = useState("");
  const [skip, setSkip] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="container">
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
        .container {
          display: flex;
          height: 100%;
          width: 100%;
          margin-top: 0;
          margin-bottom: 0;
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
      `}</style>
    </div>
  );
}

function Editor({ html, email, setHtml, setDialogOpen, skip }) {
  function onChange(e) {
    setHtml(e.target.value);
    if (!email && !skip) {
      setDialogOpen(true);
    }
  }
  return (
    <div>
      <SaveBar setDialogOpen={setDialogOpen} html={html} />
      <textarea onChange={onChange}>{html}</textarea>
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
          border: none;
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
        border: none;
      `}</style>
    </iframe>
  );
}
