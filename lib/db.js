const faunadb = require("faunadb");

console.log("faunadb_key:", process.env.faunadb);

module.exports = {
  client: new faunadb.Client({
    secret: process.env.faunadb
  })
};
