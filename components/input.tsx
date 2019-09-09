export default function Input({ width, error, color, ...props }) {
  return (
    <div>
      <input type="text" {...props} />
      <style jsx>{`
        div {
          display: inline-block;
        }
        input {
          height: 48px;
          width: ${width || "286"}px;
          border-radius: 5px;
          font-family: "Comic Sans MS", monospace;
          font-size: 18px;
          padding: 8px;
        }
        input::placeholder {
          color: initial;
        }
      `}</style>
      <style jsx>{`
        input {
          border: 1px solid ${error ? "#f3424d" : "#cccccc"};
          ${color ? "color: " + color + ";" : ""}
        }
      `}</style>
    </div>
  );
}
