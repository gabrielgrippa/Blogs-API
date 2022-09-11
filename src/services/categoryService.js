require('dotenv').config();
const { Category } = require('../database/models');

const createCategory = async (name) => {
  const newCategory = await Category.create(name);
  return newCategory;
};

// const getAllCategorys = async () => {
//   const Categorys = await Category.findAll();
//   return Categorys.map((Category) => {
//     const result = {
//       id: Category.id,
//       displayName: Category.displayName,
//       email: Category.email,
//       image: Category.image, 
//     };
//     return result;
//   });
// };
 
module.exports = { createCategory };
