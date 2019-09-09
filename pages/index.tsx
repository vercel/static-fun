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
  const router = useRouter();

  useEffect(() => {
    let href = window.location.href;

    let linkToken = router.query.edit;

    if (linkToken) {
      document.cookie = `linkToken=${linkToken}`;
      router.push("/");
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
          <h1>HTTP Status: {pageData.errorCode}</h1>
          <p>{pageData.message}</p>
          <div>
            <pre>{JSON.stringify(pageData.stack)}</pre>
          </div>
        </div>
      </FixedCenterLayout>
    );
  }

  return <Welcome />;
}
