import { useState, useEffect, useRef } from "react";
import Button from "./button";

export default function EditLinkModal({
  dialogOpen,
  setDialogOpen,
  setEmailSaved,
  email,
  setEmail,
  editLink,
  skip,
  setSkip
}) {
  const [sendingState, setSendingState] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const dialogRef = useRef();
  const editLinkRef = useRef();

  useEffect(() => {
    import("dialog-polyfill").then(dp => {
      dp.default.registerDialog(dialogRef.current);
    });
    if (dialogOpen) {
      dialogRef.current.showModal();
      editLinkRef.current.select();
      document.execCommand("copy");
    }
  }, [dialogOpen]);

  async function sendEmail() {
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

  function emailInputHandler(e) {
    setEmail(e.target.value);
  }

  function renderEmailButton() {
    switch (sendingState) {
      case "SENDING":
        return (
          <Button black disabled state="SENDING">
            ⏳
          </Button>
        );
      case "ERROR":
        return (
          <Button black onClick={sendEmail} state="ERROR">
            ❌
          </Button>
        );
      case "SUCCESS":
        return (
          <Button black disabled state="SUCCESS">
            🎉
          </Button>
        );
      default:
        return (
          <Button black onClick={sendEmail}>
            Send
          </Button>
        );
    }
  }

  return (
    <dialog ref={dialogRef}>
      <div className="content-container">
        <div className="edit-link">
          <h2>
            Secret Edit Link:{" "}
            <input ref={editLinkRef} type="text" value={editLink} readOnly />
          </h2>
          <p>
            Please don't share the edit link with anyone you don't want editing
            your page!
          </p>
        </div>
        <div className="header">
          <h2>Enter your email to save the edit link</h2>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="joe@john.com"
            value={email}
            onChange={emailInputHandler}
          />
          {renderEmailButton()}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {sendingState === "SUCCESS" && (
            <p className="success-messge">
              Email sent successfully! Please check your spam folder if you
              can't find it in your inbox yet
            </p>
          )}
        </div>
        {skip && (
          <div>
            <p>
              without saving this editing link, you will lose editing rights to
              this page, please consider emailing it to yourself
            </p>
            <Button
              onClick={() => {
                setDialogOpen(false);
                dialogRef.current.close();
              }}
            >
              skip!
            </Button>
          </div>
        )}
        {!skip && email && (
          <Button
            onClick={() => {
              setSendingState(null);
              setErrorMessage(null);
              setDialogOpen(false);
              dialogRef.current.close();
            }}
          >
            close
          </Button>
        )}
        {!skip && !email && <Button onClick={() => setSkip(true)}>skip</Button>}
      </div>
      <style jsx>{`
        dialog {
          display: none;
        }
        dialog[open] {
          display: block;
          background: gold;
          position: fixed;
          width: 500px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.4);
        }
        .header h2 {
          font-size: 16px;
        }
        .content-container {
          font-family: Menlo;
          height: 286px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }
        .edit-link h2 {
          color: red;
          font-size: 16px;
        }
        p {
          font-size: 12px;
          width: 400px;
          padding: 16px;
          font-weight: bold;
        }
        input {
          color: black;
          background: white;
          height: 32px;
          width: 286px;
          font-weight: bold;
          font-family: Menlo;
          border: none;
          padding: 8px;
        }

        .edit-link input {
          color: white;
          background: #464646;
        }
        @media (max-width: 500px) {
          dialog[open] {
            width: 100%;
          }
        }
      `}</style>
    </dialog>
  );
}
