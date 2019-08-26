export default function TopBar({ children }) {
  return <div>
    <p>
      {children}
    </p>
    <style jsx>{`
      div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: #000;
        color: #fff;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        font-size: 12px;
      }
    `}</style>
  </div>
}
