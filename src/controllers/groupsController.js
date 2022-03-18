const { insertGroup } = require('../models/groupsModel');
const { failResponce, successResponce } = require('../utils/dbHelpers');

async function addGroup(req, res) {
  const { name } = req.body;
  const insertResult = await insertGroup(name);
  return insertResult === false
    ? failResponce(res)
    : successResponce(res, 'group created');
}

module.exports = {
  addGroup,
};
