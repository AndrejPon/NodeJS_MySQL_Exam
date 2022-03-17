const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const tableName = 'bills';

// async function findUserById(userId) {
//   try {
//     const conn = await mysql.createConnection(dbConfig);
//     const sql = `
//     SELECT * FROM ${tableName} WHERE user_id = ?
//     `;
//     const [userFoundResult] = await conn.execute(sql, [userId]);
//     await conn.close();
//     return userFoundResult;
//   } catch (error) {
//     console.log('findUserById===', error);
//     return false;
//   }
// }

async function getGroupBillsDb(groupId) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM ${tableName} WHERE group_id = ?
    `;
    const [billsFoundResult] = await conn.execute(sql, [groupId]);
    await conn.close();
    return billsFoundResult;
  } catch (error) {
    console.log('getGroupBillsDb===', error);
    return false;
  }
}

// async function insertAccount(group_id, user_id) {
//   try {
//     const conn = await mysql.createConnection(dbConfig);
//     const sql = `
// INSERT INTO ${tableName} (group_id, user_id)
// VALUES (?, ?)
// `;
//     const [insertResult] = await conn.execute(sql, [group_id, user_id]);
//     // console.log('inserted data===', [group_id, user_id]);
//     await conn.close();
//     return insertResult;
//   } catch (error) {
//     console.log('insertAccount===', error);
//     return false;
//   }
// }

module.exports = {
  // findUserById,
  // insertAccount,
  getGroupBillsDb,
};
