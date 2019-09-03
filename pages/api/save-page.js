const { decode } = require("jwt-simple");
const faunadb = require("faunadb");
const { Get, Match, Index, Update, Create, Collection } = faunadb.query;

const { client } = require("../../lib/db");

module.exports = async (req, res) => {
  let {
    cookies: { token },
    body: { email, html },
    headers: { host }
  } = req;

  const { sessionId } = decode(token, process.env.secret);

  console.log({
    host,
    token,
    email,
    html,
    sessionId
  });

  // parse page information from host

  let isDev = host.includes("localhost");
  let splitHost = host.split(".");
  if ((!isDev && splitHost.length === 3) || (isDev && splitHost.length === 2)) {
    let page = splitHost[0];
    // check to see if page exists in db
    try {
      const {
        data: { sessionId: savedPageSessionId },
        ref
      } = await client.query(Get(Match(Index("page_by_name"), page)));

      console.log({ ref });

      if (sessionId === savedPageSessionId) {
        await client.query(
          Update(ref, {
            data: {
              html,
              email
            }
          })
        );
      }

      // if it does exist, check to see if sessionId matches, if it does
      //   save changes
      // if it doesn't, send message that unauthorized, send token to email
    } catch (e) {
      if (e.name === "NotFound") {
        try {
          await client.query(
            Create(Collection("pages"), {
              data: {
                sessionId,
                html,
                email,
                name: page
              }
            })
          );
        } catch (e) {
          console.error(new Error(e.message));
        }
      } else {
        console.error(new Error(e.message));
      }
    }
  }
  // if doens't exist, make new page with sessionId, email, and data
  // create new token with sessionId and email data

  //  const updatedToken = jwt.encode({ sessionId, email }, process.env.secret);

  res.setHeader("Set-Cookie", `token=${token}`);
  res.status(200).json({ editLink: `${req.headers.host}/?edit=${token}'` });
};
