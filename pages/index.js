import { useEffect, useState } from "react";
import Head from "next/head";
import PacmanLoader from "react-spinners/PacmanLoader";

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
        <PacmanLoader loading={true} />
      </FixedCenterLayout>
    );
  } else if (pageData && pageData.html === null) {
    return (
      <EditorLayout
        html={defaultMarkup}
        email={email}
        editLink={pageData.editLink}
      />
    );
  } else if (pageData && pageData.html && pageData.allowEdit) {
    return (
      <EditorLayout
        html={pageData.html}
        email={email}
        editLink={pageData.editLink}
      />
    );
  } else if (pageData && pageData.html && !pageData.allowEdit) {
    return <RenderStaticLayout html={pageData.html} />;
  } else {
    return (
      <FixedCenterLayoutTopBar>
        <p>Welcome to static.fun</p>
      </FixedCenterLayoutTopBar>
    );
  }
}
