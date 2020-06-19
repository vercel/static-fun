import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Spinner from "../components/spinner";
import { defaultMarkup, getPageData } from "../lib/data";
import { EditorLayout } from "../views/editor";
import { FixedCenterLayout } from "../views/fixed-center";
import { RenderStaticLayout } from "../views/static-layout";
import { Welcome } from "../views/welcome";

export default function IndexPage() {
  const [pageData, setPageData] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const router = useRouter();

  useEffect(() => {
    console.log("🦄 https://vercel.com/blog/wildcard-domains");
    let href = window.location.href;

    let linkToken = router.query.edit;

    if (linkToken) {
      document.cookie = `linkToken=${linkToken}`;
      window.location.href = "/";
    }

    if (!pageData) {
      getPageData(href)
        .then(data => {
          if (!data) {
            setPageData(null);
            return;
          }
          if (data.errorCode) {
            let { errorCode, stack, message } = data;
            setError({ errorCode, stack, message });
            return;
          }
          let { html, allowEdit, editLink } = data;
          setPageData({ html, allowEdit, editLink });
          return;
        })
        .catch(e => {
          setError({ message: e.message, stack: e.stack });
        });
    }
    return () => {};
  }, [pageData]);

  useEffect(() => {
    let storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  if (error) {
    return (
      <FixedCenterLayout>
        <div>
          {error.errorCode && <h1>HTTP Status: {pageData.errorCode}</h1>}
          <h2>{error.message}</h2>
          <img src="https://media.giphy.com/media/953Nn3kYUbGxO/giphy.gif" />
          {error.stack && (
            <div>
              <code>{JSON.stringify(error.stack)}</code>
            </div>
          )}
          <style jsx>{`
            div {
              text-align: center;
            }
            code {
              color: red;
            }
            img {
              max-width: 100%;
            }
          `}</style>
        </div>
      </FixedCenterLayout>
    );
  }

  if (typeof pageData === "undefined") {
    return (
      <FixedCenterLayout>
        <Spinner delay={300} />
      </FixedCenterLayout>
    );
  }

  if (pageData && pageData.html === null) {
    return (
      <EditorLayout
        html={defaultMarkup}
        email={email}
        editLink={pageData.editLink}
      />
    );
  }

  if (pageData && pageData.html && pageData.allowEdit) {
    return (
      <EditorLayout
        html={pageData.html}
        email={email}
        editLink={pageData.editLink}
      />
    );
  }

  if (pageData && pageData.html && !pageData.allowEdit) {
    return <RenderStaticLayout html={pageData.html} />;
  }

  return <Welcome />;
}
