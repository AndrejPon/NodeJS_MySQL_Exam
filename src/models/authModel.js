const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const tableName = 'users';

async function insertUser(full_name, email, pass) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
INSERT INTO ${tableName} (full_name, email, password)
VALUES (?, ?, ?)
`;
    const [insertResult] = await conn.execute(sql, [full_name, email, pass]);
    console.log('inserted data===', [full_name, email, pass]);
    await conn.close();
    return insertResult;
  } catch (error) {
    console.log('insertUser===', error);
    return false;
  }
}

async function findUserByEmail(email) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM ${tableName} WHERE email = ?
    `;
    const [userFoundResult] = await conn.execute(sql, [email]);
    await conn.close();
    return userFoundResult;
  } catch (error) {
    console.log('findUserByEmail===', error);
    return false;
  }
}

module.exports = {
  insertUser,
  findUserByEmail,
};
