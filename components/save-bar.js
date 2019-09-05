import { useState } from "react";
import Button from "./button";

export default function SaveBar({ setDialogOpen, html }) {
  const [saveState, setSaveState] = useState();

  async function savePage() {
    console.log("saving page");
    setSaveState("SAVING");
    try {
      const res = await fetch("/api/save-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ html })
      });
      if (res.ok) {
        setSaveState("SUCCESS");
      }
    } catch ({ name, message }) {
      setSaveState("ERROR");
      console.error(`${name}: ${message}`);
    }
  }

  function renderButton() {
    switch (saveState) {
      case "SAVING":
        return (
          <Button disabled state="SAVING">
            ⏳
          </Button>
        );
      case "ERROR":
        return (
          <Button disabled state="ERROR">
            ❌
          </Button>
        );
      case "SUCCESS":
        return (
          <Button disabled state="SUCCESS">
            🎉
          </Button>
        );
      default:
        return <Button onClick={savePage}>Save</Button>;
    }
  }

  return (
    <div className="container">
      <p>Last saved _ min ago</p>
      <div className="edit-link-and-save">
        <p onClick={() => setDialogOpen(true)}>show edit link</p>
        {renderButton()}
      </div>
      <style jsx>{`
        .container {
          padding: 16px;
          height: 48px;
          background: rebeccapurple;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .container p {
          font-family: Menlo, monospace;
          font-size: 14px;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }
        .edit-link-and-save {
          display: flex;
          width: 220px;
          justify-content: space-evenly;
          align-items: center;
        }
        .edit-link-and-save p {
          color: springgreen;
        }
      `}</style>
    </div>
  );
}
