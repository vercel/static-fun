import React from "react";

export default function Button({
  children,
  bg,
  width,
  height,
  state,
  fontSize,
  ...rest
}: {
  children: React.ReactNode;
  fontSize?: number;
  width?: string;
  height?: string;
  state?: string;
  bg: string;
}) {
  return (
    <button {...rest}>
      {children || "$$$"}
      <style jsx>{`
        button {
          color: white;
          font-family: Menlo, monospace;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none;
        }
        @media (max-width: 500px) {
          button {
            font-size: 12px;
          }
        }
      `}</style>
      <style jsx>{`
        button {
          background: ${bg};
          font-size: ${fontSize || "18"}px;
          width: ${width || "64"}px;
          height: ${height || "40"}px;
        }
        button:disabled {
          cursor: ${state === "SAVING" ? "wait" : "pointer"};
        }
      `}</style>
    </button>
  );
}
