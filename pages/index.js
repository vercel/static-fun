import { useEffect, useState } from "react";
import Head from "next/head";
import PacmanLoader from "react-spinners/PacmanLoader";

import { FixedCenterLayout, EditorLayout } from "../components/layouts";
import { getPageData, defaultMarkup } from "../lib/data";

export default function IndexPage() {
  const [pageData, setPageData] = useState(undefined);

  useEffect(() => {
    getPageData(setPageData);
  }, []);

  if (typeof pageData === "undefined") {
    return (
      <FixedCenterLayout>
        <PacmanLoader loading={typeof pageData === "undefined"} />
      </FixedCenterLayout>
    );
  } else if (pageData && pageData.pageData === null) {
    return <EditorLayout pageData={defaultMarkup} />;
  } else if (pageData === null || pageData.user === null) {
    return (
      <FixedCenterLayout>
        <p>Welcome to static.fun</p>
      </FixedCenterLayout>
    );
  } else {
    return <EditorLayout pageData={pageData} />;
  }
}
