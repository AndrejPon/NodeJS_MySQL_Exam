const { insertAccount } = require('../models/accountsModel');
const { failResponce, successResponce } = require('../utils/dbHelpers');

async function createAccount(req, res) {
  const { group_id } = req.body;
  const user_id = req.userId;
  const userResults = await insertAccount(group_id, user_id);
  if (userResults === false) return failResponce(res);

  return successResponce(res, userResults);
}
module.exports = {
  createAccount,
};
