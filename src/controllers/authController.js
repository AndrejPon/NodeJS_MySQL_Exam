// const bcrypt = require('bcryptjs/dist/bcrypt');
const { insertUser, findUserByEmail } = require('../models/authModel');
const { failResponce, successResponce } = require('../utils/dbHelpers');
const { hashPass, verifyHash, generateJwtToken } = require('../utils/helper');

async function register(req, res) {
  const { full_name, email, password } = req.body;

  const hashedPassword = hashPass(password);
  const insertResult = await insertUser(full_name, email, hashedPassword);

  return insertResult === false
    ? failResponce(res)
    : successResponce(res, 'user created');
}

async function login(req, res) {
  const { email, password } = req.body;
  const findResults = await findUserByEmail(email);
  if (findResults === false) return failResponce(res);
  if (!findResults.length) return failResponce(res, 'email or password does not match 1');

  const foundUserObj = findResults[0];
  if (!verifyHash(password, foundUserObj)) {
    return failResponce(res, 'email or password does not match 2');
  }

  const token = generateJwtToken(foundUserObj);
  successResponce(res, token);
}

module.exports = {
  register,
  login,
};
