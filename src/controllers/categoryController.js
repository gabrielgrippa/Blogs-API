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

const getAllCategories = async (_req, res) => {
  const result = await categoryService.getAllCategories();
  return res.status(200).json(result);
};

module.exports = { addCategory, getAllCategories };
