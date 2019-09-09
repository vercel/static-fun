import * as Sentry from "@sentry/browser";

const { NODE_ENV } = process.env;
const { SENTRY_DSN } = process.env;

if (!SENTRY_DSN) {
  console.error(
    "Please define the `SENTRY_DSN` environment variable for the build step"
  );
} else {
  Sentry.init({
    dsn: SENTRY_DSN
  });
}

export default Sentry;
