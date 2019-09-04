const uid = require("uid-promise");
const jwt = require("jwt-simple");
const faunadb = require("faunadb");
const { Get, Match, Index } = faunadb.query;
const { client } = require("../../lib/db");

module.exports = async (req, res) => {
  let {
    query: { page },
    cookies: { token, linkToken }
  } = req;

  if (!page) {
    res.status(400).json({ error: "visit [sub].domain.tld" });
  }

  let sessionId;

  if (linkToken) {
    sessionId = decode(linkToken).sessionId;
    res.setHeader("Set-Cookie", `token=${linkToken}`);
  } else if (token && !linkToken) {
    sessionId = decode(token).sessionId;
    res.setHeader("Set-Cookie", `token=${token}`);
  } else {
    try {
      sessionId = await uid(16);
      token = encode({ sessionId });
      res.setHeader("Set-Cookie", `token=${token}`);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  try {
    let {
      data: { sessionId: savedPageSessionId, html, email }
    } = await client.query(Get(Match(Index("page_by_name"), page)));

    if (savedPageSessionId === sessionId) {
      res.status(200).json({ html, email, allowEdit: true });
      return;
    } else {
      res.status(200).json({ html, email, allowEdit: false });
      return;
    }
  } catch (error) {
    console.error({ error });
    res.status(404).json({ html: null });
  }
};

function encode(o) {
  return jwt.encode(o, process.env.secret);
}

function decode(t) {
  return jwt.decode(t, process.env.secret);
}
