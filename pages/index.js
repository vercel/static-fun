import { useEffect, useState } from "react";
import Head from "next/head";
import PacmanLoader from "react-spinners/PacmanLoader";

import {
  FixedCenterLayout,
  EditorLayout,
  RenderStaticLayout
} from "../components/layouts";
import { getPageData, defaultMarkup } from "../lib/data";

export default function IndexPage() {
  const [pageData, setPageData] = useState();

  useEffect(() => {
    let linkToken = new URLSearchParams(window.location.search).get("edit");
    if (linkToken) {
      document.cookie = `linkToken=${linkToken}`;
    }
    window.history.pushState({ linkToken }, "", "/");
    getPageData(setPageData);
  }, []);

  if (typeof pageData === "undefined") {
    return (
      <FixedCenterLayout>
        <PacmanLoader loading={typeof pageData === "undefined"} />
      </FixedCenterLayout>
    );
  } else if (pageData && pageData.html === null) {
    return <EditorLayout pageData={defaultMarkup} />;
  } else if (pageData && pageData.html && pageData.allowEdit) {
    return <EditorLayout pageData={pageData.html} />;
  } else if (pageData && pageData.html && !pageData.allowEdit) {
    return <RenderStaticLayout html={pageData.html} />;
  } else {
    return (
      <FixedCenterLayout>
        <p>Welcome to static.fun</p>
      </FixedCenterLayout>
    );
  }
}
