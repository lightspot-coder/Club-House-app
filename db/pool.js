const { Pool } = require("pg");
const { env } = require("node:process");

console.log(env.PGDATABASE);

module.exports = new Pool({
  host: env.PGHOST,
  user: env.PGUSER,
  database: env.PGDATABASE,
  password: env.PGPASSWORD,
  port: env.PGPORT,
});
