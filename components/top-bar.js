export default function TopBar({ children }) {
  return (
    <div>
      <p>{children}</p>
      <style jsx>{`
        div {
          width: 100%;
          height: 50px;
          background: #0366d6;
          color: #fff;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        p {
          font-size: 12px;
          text-align: center;
        }
        @media (max-width: 500px) {
          p {
            font-size: 10px;
            font-weight: normal;
          }
        }
      `}</style>
    </div>
  );
}
