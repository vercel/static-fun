const Input = function({ width, height, bg, color, borderColor, ...props }) {
  return (
    <div>
      <input type="text" {...props} spellCheck={false} />
      <style jsx>{`
        div {
          display: inline-block;
        }
        input {
          border-radius: 5px;
          font-family: "Comic Sans", "Comic Sans MS", "Chalkboard",
            "ChalkboardSE-Regular", monospace;
          font-size: 18px;
          padding: 8px;
        }
        input::placeholder {
          color: #cccccc;
        }
      `}</style>
      <style jsx>{`
        input {
          ${bg ? "background: " + bg + ";" : ""}
          height: ${height || "48"}px;
          width: ${width || "286"}px;
          border: 1px solid ${borderColor ? borderColor : "#cccccc"};
          ${color ? "color: " + color + ";" : ""}
        }
      `}</style>
    </div>
  );
};

export default Input;
