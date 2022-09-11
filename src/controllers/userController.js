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

module.exports = { addUser };
