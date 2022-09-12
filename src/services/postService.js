const { BlogPost, User, PostCategory, Category } = require('../database/models');

const validate = async (body) => {
  const { title, content, categoryIds } = body;
  const categoriesNumber = await Category.findAll();
  const teste = categoryIds.find((id) => id > categoriesNumber.length);

  if (!title || !content || !categoryIds) return 'Some required fields are missing';
  
  if (teste) return '"categoryIds" not found';
  return undefined;
};

const getUserId = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.id;
};

const createPost = async (data, userId) => {
  const newPost = await BlogPost.create({ title: data.title, content: data.content, userId });
  const categories = data.categoryIds.map((category) => {
    const obj = {
      postId: newPost.dataValues.id,
      categoryId: category,
    };
    return obj;
  });
  await PostCategory.bulkCreate(categories);
  return newPost.dataValues;
};
 
module.exports = { getUserId, createPost, validate };
