// const bcrypt = require('bcryptjs/dist/bcrypt');
// const { insertUser, findUserByEmail } = require('../models/authModel');
const { insertGroup } = require('../models/groupsModel');
const { failResponce, successResponce } = require('../utils/dbHelpers');
// const { hashPass, verifyHash, generateJwtToken } = require('../utils/helper');

async function addGroup(req, res) {
  const { name } = req.body;

  // const hashedPassword = hashPass(password);
  const insertResult = await insertGroup(name);

  return insertResult === false
    ? failResponce(res)
    : successResponce(res, 'group created');
}

module.exports = {
  addGroup,
};
