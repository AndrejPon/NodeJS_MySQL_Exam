require('dotenv').config();
const Joi = require('joi');
const { failResponce } = require('./utils/dbHelpers');
const { verifyJwtToken } = require('./utils/helper');

async function validateTutorial(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(5).required(),
    user_id: Joi.number().min(1).max(10).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const resposnseToSend = {
      success: false,
      errors: formatedError,
    };
    res.status(400).json(resposnseToSend);
  }
}
async function validateUserRegister(req, res, next) {
  const schema = Joi.object({
    fullname: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
    // repeatpassword: Joi.string().required().valid(Joi.ref('password')),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('validateUserRegister ===', validateUserRegister);
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));

    failResponce(res, error);
  }
}
async function validateUserLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('validateUserLogin ===', validateUserLogin);
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));

    failResponce(res, error);
  }
}

async function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return failResponce(res, 'no token', 401);
  const verifyResult = verifyJwtToken(tokenGotFromUser);
  if (verifyResult === false) return failResponce(res, 'invalid token', 403);
  console.log('verifyResult ===', verifyResult);
  req.userId = verifyResult.id;
  next();
}
async function validateTokenAllTutorials(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return next();
  const verifyResult = verifyJwtToken(tokenGotFromUser);
  if (verifyResult === false) return next();
  req.validUser = true;
  next();
}

module.exports = {
  validateUserRegister,
  validateUserLogin,
  validateTutorial,
  validateToken,
  validateTokenAllTutorials,
};
