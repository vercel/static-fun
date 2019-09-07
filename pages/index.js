import { useEffect, useState } from "react";
import Head from "next/head";
import Spinner from "../components/spinner";

import {
  FixedCenterLayout,
  FixedCenterLayoutTopBar,
  EditorLayout,
  RenderStaticLayout
} from "../components/layouts";
import { getPageData, defaultMarkup } from "../lib/data";

export default function IndexPage() {
  const [pageData, setPageData] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    let href = window.location.href;
    let linkToken = new URLSearchParams(window.location.search).get("edit");

    if (linkToken) {
      document.cookie = `linkToken=${linkToken}`;
      window.history.pushState({ linkToken }, "", "/");
    }

    if (!pageData) getPageData(setPageData, href);

    let storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);

    return () => {};
  }, [pageData, email]);

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
  
  if (pageData && pageData.errorCode) {
    return (
      <FixedCenterLayout>
        <div>
          <h1>HTTP Status:{pageData.errorCode}</h1>
          <p>{pageData.message}</p>
          <div>
            <pre>{JSON.stringify(pageData.stack)}</pre>
          </div>
        </div>
      </FixedCenterLayout>
    );
  }

  return (
    <FixedCenterLayoutTopBar>
      <p>Welcome to static.fun</p>
    </FixedCenterLayoutTopBar>
  );
}
