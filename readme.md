# static.fun

Wildcard domains unlock the ability to build _platforms_ that scale. With zero-configuration, you're able to provide your customers with a personalized space on your host domain. If you haven't already read our [blog post](https://vercel.com/blog/wildcard-domains), then start there. This project is a fun and simple demonstration of wildcard domains where you are able to claim a page under any subdomain if its available and retain edit rights via a unique session identifier. Please feel free to raise issues, and send PRs where you may have questions or feel like bits of code can be improved!

### Technologies:

- [FaunaDB](https://fauna.com): high-performance, low-latency, and serverless persistence of page data, and session identifiers
- [Twilio Sendgrid](https://sendgrid.com): dead simple programmatic email service for sending unique session links
- [Pusher Channels](https://pusher.com/channels): globally distributed and managed WebSocket infrastructure for broadcasting real-time updates when saving pages

### Building Scalable Multitenant Applications

We recently launched the [Platforms Starter Kit](https://demo.vercel.pub/platforms-starter-kit) that's a comprehensive template for building multi-tenant applications with built-in custom domains support:
- Read the announcement: https://demo.vercel.pub/platforms-starter-kit
- Check out the guide: https://vercel.com/guides/nextjs-multi-tenant-application
- Try out the repo: https://github.com/vercel/platforms
