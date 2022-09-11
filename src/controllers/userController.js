const userService = require('../services/userService');

const addUser = async (req, res) => {
  // const { displayName, email, password, image } = req.body;
  const validation = await userService.validateUser(req.body);
  if (validation.message) {
    return res.status(400).json({ message: validation.message });
  }
  const existingUser = await userService.checkEmail(req.body.email);
  if (existingUser !== null) {
    return res.status(409).json({ message: 'User already registered' });
  }
  const token = await userService.createUser(req.body);
  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const allUsers = await userService.getAllUsers();
  return res.status(200).json(allUsers);
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const result = await userService.getByUserId(id);
  if (!result) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(result);
};

module.exports = { addUser, getAllUsers, getByUserId };
