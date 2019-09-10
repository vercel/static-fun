import React from "react";

export default function Button({
  children,
  fontFamily,
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
  fontFamily?: string;
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
          font-family: ${fontFamily
            ? fontFamily
            : '"San Francisco", Helvetica, sans-serif'};
          width: ${width || "83"}px;
          height: ${height || "53"}px;
        }
        button:disabled {
          cursor: ${isLoading ? "not-allowed" : "pointer"};
        }
      `}</style>
    </button>
  );
}
