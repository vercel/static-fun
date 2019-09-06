module.exports = {
  env: {
    secret: process.env.STATIC_FUN_SECRET,
    faunadb: process.env.FAUNADB_STATIC_FUN_KEY,
    sendgrid: process.env.SENDGRID_STATIC_FUN_KEY
  }
};
