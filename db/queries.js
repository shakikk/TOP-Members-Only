const pool = require("./pool");

async function getAllUsers(){
  const {rows} = await pool.query("SELECT * FROM users");
  return rows;
}

async function createUser(username, first_name, last_name, password){
  try{
    await pool.query("INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4)", [username, first_name, last_name, password]);
  } catch(err) {
    throw(`error: ${err}`);
  }
}

async function activateMembership(userId){
  try{
    await pool.query("UPDATE users SET membership_status = TRUE WHERE id=($1)", [userId]);
  } catch(err) {
    throw(`error: ${err}`);
  }
}

async function getAllMessages(){
  try{
    const { rows } = await pool.query(`
      SELECT
        m.id,
        m.user_id,
        u.username AS username,
        m.message_title,
        m.message_content,
        TO_CHAR(m.created_at, 'HH24:MI DD/MM/YY') AS created_at
      FROM messages m
      LEFT JOIN users u ON m.user_id = u.id
    `);
    return rows;
  } catch(err) {
    throw(`error: ${err}`);
  }
}

async function newMessage(message_title, message_content, user_id){
  try{
    await pool.query("INSERT INTO messages (message_title, message_content, user_id) VALUES ($1, $2, $3)", [message_title, message_content, user_id])
  } catch(err) {
    throw(`error: ${err}`);
  }
}

module.exports = {getAllUsers, createUser, activateMembership, getAllMessages, newMessage};