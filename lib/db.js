const faunadb = require("faunadb");

module.exports = {
  client: new faunadb.Client({
    secret: "fnADXFKpr0ACBN7UFGSs34oXiqJ7ZYVU8QTHDmqL"
  })
};
