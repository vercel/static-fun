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

  async function savePage() {
    // needs better validation
    if (email) {
      try {
        const res = await fetch("/api/save-page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, html })
        });
        if (res.ok) {
          setDialogOpen(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function sendEmail() {
    console.log("sending email to: ", email);
    let res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, editLink })
    });
    dialogRef.current.close();
    setDialogOpen(false);
    setSkip(false);
    localStorage.setItem("email", email);
  }

  function emailInputHandler(e) {
    setEmail(e.target.value);
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
          <Button black onClick={sendEmail}>
            send
          </Button>
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
      `}</style>
    </dialog>
  );
}
