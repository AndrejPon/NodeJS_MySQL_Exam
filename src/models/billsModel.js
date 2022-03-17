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

async function insertNewBill(group_id, amount, description) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
INSERT INTO ${tableName} (group_id, amount, description)
VALUES (?, ?, ?)
`;
    const [insertBillResult] = await conn.execute(sql, [
      group_id,
      amount,
      description,
    ]);
    await conn.close();
    return insertBillResult;
  } catch (error) {
    console.log('insertNewBill===', error);
    return false;
  }
}

module.exports = {
  // findUserById,
  insertNewBill,
  getGroupBillsDb,
};
