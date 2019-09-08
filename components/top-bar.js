import GitHub from "./github";

export default function TopBar({ url, link }) {
  return (
    <div className="top-bar-container">
      <div className="url-and-info">
        <h2>{url || "static.fun"}</h2>
        <p>
          is an open source demo to demonstrate ZEIT's support of wildcard
          domains.{"  "}
          <a href="https://zeit.co/blog/wildcard-domains">Learn More →</a>
        </p>
      </div>
      <div className="view-source">
        <a href="https://github.com/zeit/static-fun">View Source</a>
        <div>
          <GitHub />
        </div>
      </div>
      <style jsx>{`
        .top-bar-container {
          width: 100%;
          height: 50px;
          background: #9b51e0;
          color: #fff;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
        }
        .url-and-info {
          display: flex;
          align-items: center;
        }
        p {
          font-weight: normal;
          font-family: Menlo, monospace;
          font-size: 12px;
          margin-left: 16px;
        }
        a {
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        .view-source {
          display: flex;
          border-left: 1px solid white;
          align-items: center;
        }
        .view-source a {
          font-family: Menlo, monospace;
          font-size: 14px;
          text-transform: uppercase;
        }
        .view-source * {
          margin-left: 8px;
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
