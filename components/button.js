export default function Button({ children, state, ...rest }) {
  return (
    <button {...rest}>
      {children || "$$$"}
      <style jsx>{`
        button {
          background: white;
          color: black;
          text-transform: uppercase;
          font-weight: bold;
          font-family: Menlo, monospace;
          height: 32px;
          letter-spacing: 0.1rem;
          width: 64px;
          border: none;
        }
      `}</style>
      <style jsx>{`
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
