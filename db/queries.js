const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows;
}
async function addUser({ firstName, lastName, userName, password }) {
  await pool.query(
    "INSERT INTO users (fullname, username, password, membership_status) VALUES ($1,$2,$3,$4);",
    [firstName + " " + lastName, userName, password, "disable"],
  );
}
async function updateMembership(userName) {
  const { rows } = await pool.query(
    "SELECT id FROM users WHERE username = $1",
    [userName],
  );
  const user_id = rows[0];
  if (user_id == undefined) {
    throw new Error("user not find");
    return;
  }
  console.log(user_id);
  await pool.query(
    "UPDATE users SET membership_status = 'enable' WHERE id = $1;",
    [user_id.id],
  );
}
async function getUserInfo(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}
async function getUserInfoById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

module.exports = {
  getMessages,
  addUser,
  updateMembership,
  getUserInfo,
  getUserInfoById,
};
