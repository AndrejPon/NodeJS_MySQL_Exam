const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const tableName = 'accounts';

async function findUserById(userId) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM ${tableName} WHERE user_id = ?
    `;
    const [userFoundResult] = await conn.execute(sql, [userId]);
    await conn.close();
    return userFoundResult;
  } catch (error) {
    console.log('findUserById===', error);
    return false;
  }
}

async function getUserGroupsDb(userId) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT accounts.user_id, accounts.group_id, groups.name FROM accounts LEFT JOIN groups ON accounts.group_id=groups.id WHERE user_id=?
    `;
    const [groupsFoundResult] = await conn.execute(sql, [userId]);
    await conn.close();
    return groupsFoundResult;
  } catch (error) {
    console.log('getUserGroupsDb===', error);
    return false;
  }
}

async function insertAccount(group_id, user_id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
INSERT INTO ${tableName} (group_id, user_id)
VALUES (?, ?)
`;
    const [insertResult] = await conn.execute(sql, [group_id, user_id]);
    await conn.close();
    return insertResult;
  } catch (error) {
    console.log('insertAccount===', error);
    return false;
  }
}

module.exports = {
  findUserById,
  insertAccount,
  getUserGroupsDb,
};
