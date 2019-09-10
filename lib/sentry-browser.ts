import * as Sentry from "@sentry/browser";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const { NODE_ENV } = process.env;
const { SENTRY_DSN } = process.env;
const { NEXT_PHASE } = process.env;

if (NODE_ENV !== "development" && NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
  if (!SENTRY_DSN) {
    console.error(
      "Please define the `SENTRY_DSN` environment variable for the build step"
    );
  } else {
    Sentry.init({
      dsn: SENTRY_DSN
    });
  }
}

export default Sentry;
