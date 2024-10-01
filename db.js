var sqlite3 = require("sqlite3");
var mkdirp = require("mkdirp");

mkdirp.sync("./var/db");

var db = new sqlite3.Database("./var/db/data.db");

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB, \
    name TEXT \
  )"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    UNIQUE (provider, subject) \
  )"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS locations ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    timestamp TEXT NOT NULL, \
    lat TEXT NOT NULL, \
    long TEXT NOT NULL \
  )"
  );
});

module.exports = db;
