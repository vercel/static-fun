import { useState } from "react";
import Button from "./button";

export default function SaveBar({
  setDialogOpen,
  html,
  saveState,
  setSaveState
}) {
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
          <Button
            bg="#CDAE8F"
            width={80}
            height={36}
            fontSize={24}
            disabled
            isLoading
          >
            ⏳
          </Button>
        );
      case "ERROR":
        return (
          <Button
            bg="#000000"
            width={80}
            height={36}
            fontSize={24}
            onClick={savePage}
          >
            ❌
          </Button>
        );
      case "SUCCESS":
        return (
          <Button bg="#0085FF" width={80} height={36} fontSize={24} disabled>
            🎉
          </Button>
        );
      default:
        return (
          <Button
            width={80}
            height={36}
            bg="#FF0080"
            fontSize={14}
            onClick={savePage}
          >
            SAVE
          </Button>
        );
    }
  }

  return (
    <div className="save-bar-container">
      <p>Last saved _ min ago</p>
      <div className="edit-link-and-save">
        <p onClick={() => setDialogOpen(true)}>🔏 EDIT LINK</p>
        {renderButton()}
      </div>
      <style jsx>{`
        .save-bar-container {
          padding: 16px;
          height: 48px;
          background: #2bbaf8;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .save-bar-container p {
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
        @media (max-width: 500px) {
          .save-bar-container p {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}
