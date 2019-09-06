module.exports = (req, res) => {
  const { email, editLink } = req.body;
  console.log({ email, editLink });
  res
    .status(500)
    .json({ message: "something went wrong, try sending email again" });
};
