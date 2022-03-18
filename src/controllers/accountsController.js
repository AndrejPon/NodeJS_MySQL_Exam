const { insertAccount, getUserGroupsDb } = require('../models/accountsModel');
const { failResponce, successResponce } = require('../utils/dbHelpers');

async function createAccount(req, res) {
  const { group_id } = req.body;
  const user_id = req.userId;
  const userResults = await insertAccount(group_id, user_id);
  if (userResults === false) return failResponce(res);

  return successResponce(res, userResults);
}
async function getUserGroups(req, res) {
  const user_id = req.userId;
  const getGroupsResults = await getUserGroupsDb(user_id);
  if (getGroupsResults === false) return failResponce(res);

  return successResponce(res, getGroupsResults);
}

module.exports = {
  createAccount,
  getUserGroups,
};
