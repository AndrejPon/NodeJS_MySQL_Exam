// const { insertAccount, getUserGroupsDb } = require('../models/accountsModel');
const { getGroupBillsDb, insertNewBill } = require('../models/billsModel');
const { failResponce, successResponce } = require('../utils/dbHelpers');

async function createBill(req, res) {
  const { group_id, amount, description } = req.body;
  // const user_id = req.userId;
  const newBillResults = await insertNewBill(group_id, amount, description);
  if (newBillResults === false) return failResponce(res);

  return successResponce(res, newBillResults);
}
async function getGroupBills(req, res) {
  const groupId = req.params.id;
  const getGroupBillsResults = await getGroupBillsDb(groupId);
  if (getGroupBillsResults === false) return failResponce(res);

  return successResponce(res, getGroupBillsResults);
}

module.exports = {
  createBill,
  getGroupBills,
};
