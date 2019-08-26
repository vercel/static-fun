import { useEffect, useState } from "react";
import Head from "next/head";
import PacmanLoader from "react-spinners/PacmanLoader";

import { FixedCenterLayout } from "../components/layouts";
import { getPageData } from "../lib/data";

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
  } else if (pageData === null) {
    return (
      <FixedCenterLayout>
        <p>Welcome to static.fun</p>
      </FixedCenterLayout>
    );
  } else {
    return (
      <FixedCenterLayout>
        <div dangerouslySetInnerHTML={{ __html: pageData }} />
      </FixedCenterLayout>
    );
  }
}
