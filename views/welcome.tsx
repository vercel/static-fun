import Head from "next/head";
import { useState } from "react";

import Button from "../components/button";
import Input from "../components/input";
import TopBar from "../components/top-bar";

export function Welcome() {
  const [pageToSearch, setPageToSearch] = useState("");
  const [pageExists, setPageExists] = useState();
  const [searchState, setSearchState] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  async function checkIfPageExists(e) {
    e.preventDefault();
    if (pageToSearch) {
      setSearchState("SEARCHING");
      try {
        let res = await fetch(`/api/get-page?page=${pageToSearch}`);
        if (res.status === 200) {
          setSearchState("ERROR");
          setPageExists({ name: `${pageToSearch}.static.fun` });
        }
        if (res.status === 404) {
          window.location.href = `https://${pageToSearch}.static.fun`;
        } else {
          let { message, stack } = await res.json();
          throw new Error(message);
        }
      } catch (e) {
        setErrorMessage(e.message);
        setSearchState("NETWORK_ERROR");
      }
    }
  }

  function pageSearchInputHandler(e) {
    if (searchState) {
      setSearchState("");
      setPageExists(null);
    }
    setPageToSearch(e.target.value);
  }

  function renderButton() {
    switch (searchState) {
      case "SEARCHING":
        return (
          <Button bg="#cdae8f" disabled fontSize={32}>
            ⏳
          </Button>
        );
      case "ERROR":
        return (
          <Button bg="#f3424d" disabled fontSize={32}>
            →
          </Button>
        );
      case "NETWORK_ERROR":
        return (
          <Button bg="#000000" onClick={checkIfPageExists} fontSize={24}>
            ❌
          </Button>
        );
      default:
        return (
          <Button bg="#9b51e0" onClick={checkIfPageExists} fontSize={32}>
            →
          </Button>
        );
    }
  }

  return (
    <main>
      <Head>
        <title>Static Fun</title>
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
      </Head>
      <TopBar grayScale={Boolean(pageExists)} />
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
        <form className="form" onSubmit={checkIfPageExists}>
          <h2>To start go to</h2>
          <Input
            required
            color="#9b51e0"
            value={pageToSearch}
            onChange={pageSearchInputHandler}
            error={Boolean(searchState === "ERROR")}
            placeholder="my-fun-page"
            width={180}
          />
          <span className="suffix">.static.fun</span>
          {renderButton()}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {pageExists && (
            <p className="page-exists">
              🚨
              <a href={`https://${pageExists.name}`}>{pageExists.name}</a>{" "}
              taken! Try another one.
            </p>
          )}
        </form>
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
          font-family: "Comic Sans MS", monospace;
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
          margin-top: 0;
          height: 100px;
        }
        .form h2 {
          margin-bottom: 16px;
        }
        .form .suffix {
          font-family: "Comic Sans MS", monospace;
          font-weight: bold;
          font-size: 18px;
          margin-left: 4px;
          margin-right: 8px;
        }

        .form .page-exists,
        .form .error-message {
          color: red;
          margin-top: 8px;
          font-family: Menlo, monospace;
          text-transform: uppercase;
        }
        .form .page-exists a {
          color: red;
        }
        .emojis {
          height: 300px;
          width: 100%;
          background-image: url("/static/emoji-bg.svg");
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
      <style jsx>{`
        .welcome,
        .emojis {
          filter: ${pageExists ? "grayscale(1)" : "none"};
        }
      `}</style>
    </main>
  );
}
