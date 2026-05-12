const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query(
    "SELECT messages.id,fullname,title,timestamp,text FROM messages JOIN users ON users.id = messages.user_id;",
  );
  return rows;
}
async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id=$1;", [id]);
}
async function getUserNamesAndIds() {
  const { rows } = await pool.query(
    " SELECT DISTINCT users.id,username FROM users JOIN messages ON users.id = messages.user_id;",
  );
  return rows;
}
async function addUser({ firstName, lastName, userName, password, admin }) {
  await pool.query(
    "INSERT INTO users (fullname, username, password, membership_status, admin) VALUES ($1,$2,$3,$4,$5);",
    [firstName + " " + lastName, userName, password, "disable", admin],
  );
}
async function updateMembership(userId) {
  await pool.query(
    "UPDATE users SET membership_status = 'enable' WHERE id = $1;",
    [userId],
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
async function addMessage(userId, message) {
  const currentDate = new Date();
  const timestamp =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate();
  const { rows } = await pool.query(
    "INSERT INTO messages (user_id,title, timestamp, text) VALUES ($1,$2,$3,$4) RETURNING id;",
    [userId, message.title, timestamp, message.text],
  );
  return rows[0]; // return last id insert into messages table
}
async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id=$1;", [
    id,
  ]);
  return rows[0];
}

module.exports = {
  getMessages,
  addUser,
  updateMembership,
  getUserInfo,
  getUserInfoById,
  addMessage,
  getMessageById,
  getUserNamesAndIds,
  deleteMessage,
};
