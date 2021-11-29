const Pool = require("pg").Pool;

const pool = new Pool({
  user: "parvej",
  password: "",
  host: "localhost",
  port: 5432,
  database: "dogdata",
});

module.exports = pool;
