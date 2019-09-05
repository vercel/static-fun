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

  useEffect(() => {
    let href = window.location.href;
    let linkToken = new URLSearchParams(window.location.search).get("edit");
    if (linkToken) {
      document.cookie = `linkToken=${linkToken}`;
      window.history.pushState({ linkToken }, "", "/");
    }
    if (!pageData) {
      getPageData(setPageData, href);
    }
    console.log({ pageData });
    return () => {};
  }, [pageData]);

  if (typeof pageData === "undefined") {
    return (
      <FixedCenterLayout>
        <PacmanLoader loading={true} />
      </FixedCenterLayout>
    );
  } else if (pageData && pageData.html === null) {
    return <EditorLayout html={defaultMarkup} editLink={pageData.editLink} />;
  } else if (pageData && pageData.html && pageData.allowEdit) {
    return (
      <EditorLayout
        html={pageData.html}
        email={pageData.email}
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
