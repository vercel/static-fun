import { useState } from "react";
import Button from "./button";

export default function SaveBar() {
  return (
    <div className="container">
      <p>Last saved _ min ago</p>
      <div className="edit-link-and-save">
        <p>show edit link</p>
        <Button>Save</Button>
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
