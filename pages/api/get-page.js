const uid = require("uid-promise");
const jwt = require("jwt-simple");

const existingPages = ["paulo", "rauchg"];

module.exports = async (req, res) => {
  console.log("SECRET", process.env.secret);

  // grab page subdomain data from req.query
  const { page } = req.query;

  // query fauna to see if page exists

  console.log("page", page);

  // if unclaimed "space", generate uid and send cookie with 404
  if (!existingPages.includes(page)) {
    const sessionId = await uid(21);
    // generate new jwt with sessionId encrypted with secret
    const token = jwt.encode({ sessionId }, process.env.secret);
    // send back token as a cookie to persist on client
    res.setHeader("Set-Cookie", `token=${token}`);
    // return 404 and explicit null pageData to inform client to
    // render default page
    res.status(404).json({ pageData: null });
    return;
  } else {
    // found page, send it down the wire
    res.status(200).json({ pageData})
  }

};
