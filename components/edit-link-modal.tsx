import { useEffect, useRef, useState } from "react";

import Button from "./button";

export default function EditLinkModal({
  dialogOpen,
  setDialogOpen,
  email,
  setEmail,
  editLink
}) {
  const [sendingState, setSendingState] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const dialogRef = useRef<HTMLDialogElement>();
  const editLinkRef = useRef<HTMLInputElement>();

  useEffect(() => {
    import("dialog-polyfill").then(dp => {
      dp.default.registerDialog(dialogRef.current);
    });
    if (dialogOpen) {
      dialogRef.current.showModal();
      editLinkRef.current.focus();
      editLinkRef.current.select();
      document.execCommand("copy");
    }
  }, [dialogOpen]);

  async function sendEmail() {
    console.log("sending email to: ", email);
    if (email) {
      setSendingState("SENDING");
      setErrorMessage(null);
      let res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, editLink })
      });
      if (res.ok) {
        setSendingState("SUCCESS");
        localStorage.setItem("email", email);
      }
      if (!res.ok) {
        setSendingState("ERROR");
        let { message } = await res.json();
        setErrorMessage(message);
      }
    }
  }

  function emailInputHandler(e) {
    setEmail(e.target.value);
  }

  function renderEmailButton() {
    switch (sendingState) {
      case "SENDING":
        return (
          <Button bg="#CDAE8F" fontSize={44} disabled isLoading>
            ⏳
          </Button>
        );
      case "ERROR":
        return (
          <Button bg="#000000" onClick={sendEmail} fontSize={44}>
            ❌
          </Button>
        );
      case "SUCCESS":
        return (
          <Button bg="#0085FF" disabled fontSize={44}>
            🎉
          </Button>
        );
      default:
        return (
          <Button
            bg="#9B51E0"
            disabled={!Boolean(email)}
            fontSize={44}
            onClick={sendEmail}
          >
            💌
          </Button>
        );
    }
  }

  return (
    <dialog ref={dialogRef}>
      <div className="content-container">
        <div className="edit-link">
          <h2>Secret Edit Link</h2>
          <input ref={editLinkRef} type="text" value={editLink} readOnly />
          <p>
            Please don't share the edit link with anyone you don't want editing
            your page!
          </p>
          <hr />
        </div>
        <div className="email">
          <h2>Enter your email to save the edit link (recommended)</h2>
        </div>
        <div className="email-input-container">
          <input
            type="text"
            placeholder="joe@john.com"
            value={email}
            onChange={emailInputHandler}
          />
          {renderEmailButton()}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        {sendingState === "SUCCESS" && (
          <p className="success-messge">
            Email sent successfully! Please check your spam folder if you can't
            find it in your inbox yet
          </p>
        )}

        <p
          className="close"
          onClick={() => {
            dialogRef.current.close();
            setSendingState(null);
            setErrorMessage(null);
            setDialogOpen(false);
          }}
        >
          Close
        </p>
      </div>
      <style jsx>{`
        dialog {
          display: none;
        }
        dialog[open] {
          display: flex;
          background: #f9d749;
          border-radius: 6px;
          position: fixed;
          height: 460px;
          width: 600px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.4);
        }
        .content-container {
          height: 100%;
          width: 100%;
          padding: 10px 15px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .edit-link input {
          height: 53px;
          width: 447px;
          border-radius: 5px;
          border: none;
          background: #000;
          color: #fff;
          font-family: "Comic Sans Ms", Menlo, monospace;
          font-size: 24px;
        }
        .edit-link h2 {
          font-size: 40px;
          margin-top: 24px;
          margin-bottom: 16px;
        }
        .edit-link hr {
          border: 1px solid black;
          margin-top: 8px;
          width: 447px;
        }
        .email {
          width: 100%;
          margin-top: 24px;
        }
        .email h2 {
          font-size: 24px;
        }
        p {
          font-size: 12px;
          width: 400px;
          padding: 16px;
          font-weight: bold;
          font-family: Menlo, monospace;
        }
        .email-input-container {
          flex: auto;
          display: flex;
          align-items: center;
        }
        .email-input-container input {
          color: black;
          background: white;
          height: 53px;
          width: 286px;
          font-weight: bold;
          font-family: "Comic Sans", "Comic Sans MS", "Chalkboard",
            "ChalkboardSE-Regular", monospace;
          border: 1px solid black;
          padding: 8px;
          margin-right: 8px;
          border-radius: 5px;
          font-size: 24px;
        }

        .close {
          font-size: 16px;
          width: fit-content;
          cursor: pointer;
        }

        @media (max-width: 500px) {
          dialog[open] {
            width: 100%;
          }
          .edit-link input {
            width: 80%;
          }
          .edit-link p {
            width: 80%;
            margin: auto;
          }
          .email-input-container input {
            width: 200px;
          }
        }
      `}</style>
    </dialog>
  );
}
