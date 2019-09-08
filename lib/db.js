const faunadb = require("faunadb");

module.exports = {
  client: new faunadb.Client({
    secret: process.env.FAUNADB_STATIC_FUN_KEY
  })
};
