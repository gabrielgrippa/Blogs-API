require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const validateUser = async (newUser) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
  });

  const { error } = schema.validate(newUser);
  if (error) {
    return { message: error.message };
  }
  return 'ok';
};

const checkEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (newUser) => {
  await User.create(newUser);
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: newUser.email }, process.env.JWT_SECRET, jwtConfig);
  console.log(token);
  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users.map((user) => {
    const result = {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      image: user.image, 
    };
    return result;
  });
};
 
module.exports = { validateUser, checkEmail, createUser, getAllUsers };
