import Head from "next/head";
import TopBar from "./top-bar";
import EditorContainer from "./editor";
import Input from "./input";
import Button from "./button";

export function FixedCenterLayout({ children, title }) {
  return (
    <main>
      <Head>
        <title>{title || "Static Fun"}</title>
      </Head>
      <div className="children-container">{children}</div>
      <style jsx>{`
        html {
          background: none;
        }
        .children-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </main>
  );
}

export function WelcomeLayout() {
  return (
    <main>
      <Head>
        <title>Static Fun</title>
      </Head>
      <TopBar />
      <div className="welcome-container">
        <div className="welcome">
          <h1>Welcome to</h1>
          <div>
            <span className="static">static</span>
            <span className="fun">.fun</span>
          </div>
          <p>
            An{" "}
            <a href="https://github.com/zeit/static-fun">open source project</a>{" "}
            to demonstrate ZEIT's support of{" "}
            <a href="https://zeit.co/blog/wildcard-domains">wildcard domains</a>
          </p>
        </div>
        <div className="form">
          <h2>To start go to</h2>
          <Input placeholder="my-fun-page" width={180} />
          <span className="suffix">.static.fun</span>
          <Button bg="#9b51e0" fontSize={32}>
            →
          </Button>
        </div>
        <div className="emojis" />
      </div>
      <style jsx>{`
        main {
          height: 100vh;
          width: 100vw;
        }
        .welcome-container {
          display: flex;
          margin-top: 56px;
          height: 100%;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        .welcome {
          text-align: center;
        }
        .welcome span {
          font-weight: bold;
          font-size: 64px;
        }
        .welcome .static {
          color: #9b51e0;
        }
        .welcome .fun {
          font-family: "Comic Sans MS";
        }
        .welcome p {
          margin-top: 32px;
          width: 500px;
          font-size: 14px;
          line-height: 28px;
          font-family: Menlo, monospace;
        }
        .welcome a {
          font-weight: bold;
          color: black;
        }
        .form {
          text-align: center;
          margin-top: 48px;
        }
        .form h2 {
          margin-bottom: 16px;
        }
        .form .suffix {
          font-family: "Comic Sans MS";
          font-weight: bold;
          font-size: 18px;
          margin-left: 4px;
          margin-right: 8px;
        }
        .emojis {
          height: 100%;
          width: 100%;
          background-image: url("/static/emoji-bg.svg");
          background-repeat: no-repeat;
        }
      `}</style>
    </main>
  );
}

export function FixedCenterLayoutTopBar({ children, title }) {
  return (
    <main>
      <Head>
        <title>{title || "Static Fun"}</title>
      </Head>
      <TopBar />
      <div className="children-container">{children}</div>
      <style jsx>{`
        html {
          background: none;
        }
        .children-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </main>
  );
}

export function EditorLayout({ html, email, editLink }) {
  return (
    <main>
      <TopBar info />
      <EditorContainer html={html} email={email} editLink={editLink} />
      <style jsx>{`
        main {
          height: 100vh;
        }
      `}</style>
    </main>
  );
}

export function RenderStaticLayout({ html }) {
  return (
    <>
      <main dangerouslySetInnerHTML={{ __html: html }}></main>
      <style jsx>{`
        main {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
