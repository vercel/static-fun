const uid = require("uid-promise");
const jwt = require("jwt-simple");

module.exports = async (req, res) => {
  const { page } = req.query;
  const { token } = req.cookies;

  console.log(token);

  if (!page) {
    res.status(200).json({ pageData: null, user: null });
  }

  if (!token) {
    const sessionId = await uid(21);
    const token = jwt.encode({ sessionId }, process.env.secret);

    res.setHeader("Set-Cookie", `token=${token}`);
    res.status(404).json({ pageData: null, user: page });

    return;
  } else {
    res.status(200).json({ pageData: null, user: page });
  }
};
