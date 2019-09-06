module.exports = {
  env: {
    secret: process.env.STATIC_FUN_SECRET,
    faunadb: process.env.FAUNADB_STATIC_FUN_KEY,
    sendgrid: process.env.SENDGRID_STATIC_FUN_KEY,
    sendgridTemplateId: "d-b6df12fb1c5141a8b71b5e600ec84a46"
  }
};
