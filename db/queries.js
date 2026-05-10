const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows;
}
async function addUser({ firstName, lastName, userName, password }) {
  await pool.query(
    "INSERT INTO users (fullname, username, password, membership_status) VALUES ($1,$2,$3,$4);",
    [firstName + " " + lastName, userName, password, "visitor"],
  );
}

module.exports = {
  getMessages,
  addUser,
};
