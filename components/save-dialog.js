import { useState } from "react";

export default function SaveDialog({
  dialogOpen,
  setDialogOpen,
  setEmailSaved,
  html
}) {
  const [email, setEmail] = useState("");
  const [editLink, setEditLink] = useState("");

  async function savePage() {
    // needs better validation
    if (email) {
      const res = await fetch("/api/save-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, html })
      });
      if (res.ok) {
        const { editLink: link } = await res.json();
        setEditLink(link);
      }
    }

    //setDialogOpen(false);
  }

  function emailInputHandler(e) {
    setEmail(e.target.value);
  }

  return (
    <dialog open={dialogOpen}>
      <div className="content-container">
        {editLink && (
          <div className="edit-link">
            <p>
              Edit Link: <span>{editLink}</span>
            </p>
          </div>
        )}
        <div className="header">
          <h2>Enter your email to save the page and get an edit link</h2>
        </div>
        <div className="input-container">
          <input type="text" value={email} onChange={emailInputHandler} />
          <button onClick={savePage}>save</button>
        </div>
      </div>
      <style jsx>{`
        dialog[open] {
          background: gold;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .header h2 {
          font-size: 16px;
          width: 284px;
        }
        .content-container {
          height: 144px;
          width: fit-content;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
        .edit-link {
          font-weight: bold;
        }
        .edit-link span {
          color: red;
        }
      `}</style>
    </dialog>
  );
}
