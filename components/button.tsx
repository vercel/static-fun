import React from "react";

export default function Button({
  children,
  bg,
  width,
  height,
  fontSize,
  isLoading,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: React.ReactNode;
  fontSize?: number;
  width?: number;
  height?: number;
  isLoading?: boolean;
  bg?: string;
}) {
  return (
    <button {...rest}>
      {children || "$$$"}
      <style jsx>{`
        button {
          color: white;
          font-family: Menlo, monospace;
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
          background: ${bg || "inherit"};
          font-size: ${fontSize || "18"}px;
          width: ${width || "64"}px;
          height: ${height || "40"}px;
        }
        button:disabled {
          cursor: ${isLoading ? "wait" : "pointer"};
        }
      `}</style>
    </button>
  );
}
