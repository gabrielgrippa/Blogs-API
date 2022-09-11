const categoryService = require('../services/categoryService');

const addCategory = async (req, res) => {
  const name = req.body;
  console.log(name);
  if (!name.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const newCategory = await categoryService.createCategory(name);
  return res.status(201).json(newCategory);
};

module.exports = { addCategory };
