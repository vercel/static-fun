import { useState, useEffect, useRef } from "react";

export default function ShowEditLink({
  dialogOpen,
  setDialogOpen,
  setEmailSaved,
  email,
  setEmail,
  editLink
}) {
  const [skip, setSkip] = useState(false);
  const dialogRef = useRef();

  useEffect(() => {
    console.log("dialogref", dialogRef);
    if (dialogOpen) {
      dialogRef.current.showModal();
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
    setDialogOpen(false);
    setSkip(false);
    dialogRef.current.close();
  }

  function emailInputHandler(e) {
    setEmail(e.target.value);
  }

  return (
    <dialog ref={dialogRef}>
      <div className="content-container">
        <div className="edit-link">
          <p>
            Edit Link: <input type="text" value={editLink} />
          </p>
        </div>
        <div className="header">
          <h2>Enter your email to save the edit link</h2>
        </div>
        <div className="input-container">
          <input type="text" value={email} onChange={emailInputHandler} />
          <button onClick={sendEmail}>send</button>
        </div>
        {skip && (
          <div>
            <p>
              without saving this editing link, you will lose editing rights to
              this page, please consider emailing it to yourself
            </p>
            <button
              onClick={() => {
                setDialogOpen(false);
                setSkip(false);
                dialogRef.current.close();
                y;
              }}
            >
              skip!
            </button>
          </div>
        )}
        {!skip && email && (
          <button
            onClick={() => {
              setDialogOpen(false);
              dialogRef.current.close();
            }}
          >
            close
          </button>
        )}
        {!skip && !email && <button onClick={() => setSkip(true)}>skip</button>}
      </div>
      <style jsx>{`
        dialog[open] {
          background: gold;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.4);
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
