import { useState, useEffect } from "react";

import Button from "./button";
import ms from "ms";

export default function SaveBar({
  setDialogOpen,
  html,
  saveState,
  setSaveState,
  showEditLink,
  setShowEditLink
}) {
  const [lastSaved, setLastSaved] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [currentTimeInterval, setCurrentTimeInterval] = useState();

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
        if (!showEditLink) {
          setShowEditLink(true);
          setDialogOpen(true);
        }
        setLastSaved(Date.now());
      }
    } catch ({ name, message }) {
      setSaveState("ERROR");
      console.error(`${name}: ${message}`);
    }
  }

  useEffect(() => {
    if (lastSaved) {
      setCurrentTime(Date.now());
      setCurrentTimeInterval(
        setInterval(() => {
          setCurrentTime(Date.now());
        }, 10000)
      );
    }
    return () => {
      if (currentTimeInterval) {
        clearInterval(currentTimeInterval);
      }
    };
  }, [lastSaved]);

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
            fontFamily="Menlo, monospace"
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

  function renderLastSaved() {
    if (lastSaved) {
      return `Last saved ${ms((currentTime || Date.now()) - lastSaved, {
        long: true
      })} ago`;
    } else {
      return null;
    }
  }

  return (
    <div className="save-bar-container">
      <p className="last-saved">{renderLastSaved()}</p>
      <div className="edit-link-and-save">
        {showEditLink && (
          <p
            className="edit-link"
            onClick={() => {
              console.log("opening dialog");
              setDialogOpen(true);
            }}
          >
            🔏 EDIT LINK
          </p>
        )}
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
          align-items: center;
        }
        .edit-link-and-save p {
          margin-right: 16px;
        }
        @media (max-width: 500px) {
          .last-saved {
            width: 120px;
          }
        }
      `}</style>
    </div>
  );
}
