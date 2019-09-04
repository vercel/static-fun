export default function Button({ children, ...rest }) {
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
        button:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </button>
  );
}
