#! /usr/bin/env node

const { Client } = require("pg");
const { env } = require("node:process");

//console.log(env.USER);
//console.log(env.PASSWORD);

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullname VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  membership_status VARCHAR ( 255 ),
  admin VARCHAR ( 255 )
);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users (id),
  title VARCHAR ( 255 ),
  timestamp VARCHAR ( 255 ),
  text VARCHAR ( 255 )
);
`;

async function main() {
  console.log("seeding...");
  console.log(
    `postgresql://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`,
  );
  console.log("postgresql://odinstudent:jp1843@localhost:5432/clubhouse");
  const client = new Client({
    connectionString: `postgresql://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
