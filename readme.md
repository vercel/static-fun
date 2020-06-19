# static.fun

### Summary:

Wildcard domains unlock the ability to build _platforms_ that scale. With zero-configuration, you're able to provide your customers with a personalized space on your host domain. If you haven't already read our [blog post](https://vercel.com/blog/wildcard-domains), then start there. This project is a fun and simple demonstration of wildcard domains where you are able to claim a page under any subdomain if its available and retain edit rights via a unique session identifier. Please feel free to raise issues, and send PRs where you may have questions or feel like bits of code can be improved!

### Technologies:

- [FaunaDB](https://fauna.com): high-performance, low-latency, and serverless persistence of page data, and session identifiers
- [Twilio Sendgrid](https://sendgrid.com): dead simple programmatic email service for sending unique session links
- [Pusher Channels](https://pusher.com/channels): globally distributed and managed WebSocket infrastructure for broadcasting real-time updates when saving pages
- [Simple Analytics](https://simpleanalytics.com): simple, clean, and friendly analytics for keeping track of page views
- [Sentry](https://sentry.io): pleasant bug tracking for runtime errors and edge cases that we may not discover during development
