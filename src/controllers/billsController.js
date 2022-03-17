// const { insertAccount, getUserGroupsDb } = require('../models/accountsModel');
const { getGroupBillsDb } = require('../models/billsModel');
const { failResponce, successResponce } = require('../utils/dbHelpers');

// async function createAccount(req, res) {
//   const { group_id } = req.body;
//   const user_id = req.userId;
//   const userResults = await insertAccount(group_id, user_id);
//   if (userResults === false) return failResponce(res);

//   return successResponce(res, userResults);
// }
async function getGroupBills(req, res) {
  const groupId = req.params.id;
  const getGroupBillsResults = await getGroupBillsDb(groupId);
  if (getGroupBillsResults === false) return failResponce(res);

  return successResponce(res, getGroupBillsResults);
}

module.exports = {
  // createAccount,
  getGroupBills,
};
