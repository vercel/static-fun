export default function Button({ children, black, state, ...rest }) {
  return (
    <button {...rest}>
      {children || "$$$"}
      <style jsx>{`
        button {
          background: white;
          text-transform: uppercase;
          font-weight: bold;
          font-family: Menlo, monospace;
          height: 32px;
          letter-spacing: 0.1rem;
          width: 64px;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 500px) {
          button {
            font-size: 12px;
          }
        }
      `}</style>
      <style jsx>{`
        button {
          color: ${black ? "white" : "black"};
          background: ${black ? "black" : "white"};
        }
        button:disabled {
          cursor: ${state === "SAVING" ? "wait" : "pointer"};
          text-decoration: none;
        }
        button:hover {
          text-decoration: ${state !== "SAVING" &&
          state !== "ERROR" &&
          state !== "SUCCESS"
            ? "underline"
            : "none"};
        }
      `}</style>
    </button>
  );
}
