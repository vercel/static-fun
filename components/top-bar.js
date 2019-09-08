import GitHub from "./github";
import Link from "next/link";

export default function TopBar({ url, info }) {
  return (
    <div className="top-bar-container">
      <div className="url-and-info">
        <a href="https://static.fun">
          <h2>static.fun</h2>
        </a>
        {info && (
          <p>
            is an open source demo to demonstrate ZEIT's support of wildcard
            domains.{"  "}
            <a href="https://zeit.co/blog/wildcard-domains">Learn More →</a>
          </p>
        )}
      </div>
      <div className="view-source">
        <a href="https://github.com/zeit/static-fun">
          <p href="https://github.com/zeit/static-fun">VIEW SOURCE</p>
          <div>
            <GitHub />
          </div>
        </a>
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
        .url-and-info .url {
          font-size: 24px;
          font-weight: bold;
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
          border-left: 1px solid white;
        }

        .view-source p {
          font-weight: bold;
          font-size: 14px;
        }

        .view-source a {
          display: flex;
          align-items: center;
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
