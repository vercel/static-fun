export default function Input({ width, ...props }) {
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
          border: 1px solid #cccccc;
          font-family: "Comic Sans MS";
          font-size: 18px;
          padding: 8px;
        }
      `}</style>
    </div>
  );
}
