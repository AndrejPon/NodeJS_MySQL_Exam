// const { func } = require('joi');
const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

const tableName = 'groups';

async function insertGroup(name) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
INSERT INTO ${tableName} (name)
VALUES (?)
`;
    const [insertResult] = await conn.execute(sql, [name]);
    console.log('inserted data===', [name]);
    await conn.close();
    return insertResult;
  } catch (error) {
    console.log('insertGroup===', error);
    return false;
  }
}

module.exports = {
  insertGroup,
};
