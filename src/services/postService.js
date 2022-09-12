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

// const findUser = async (id) => {
//   const a = await User.findOne({ where: { id } });
//   return a;
// };

const getPostById = async (id) => {
    const post = await BlogPost.findOne({ where: { id }, raw: true });
    if (!post) return undefined;
    const user = await User.findOne({ where: { id: post.userId }, raw: true });
    delete user.password;
    const postCatData = await PostCategory.findAll({ where: { postId: post.id }, raw: true });
    const categoriesData = await Category.findAll({ raw: true });
    const categories = postCatData.map((category) => {
      const teste = categoriesData.find((categoryId) => categoryId.id === category.categoryId);
      return teste;
    });
    const result = {
      ...post,
      user,
      categories,
    };
    return result;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll();
  const newPosts = posts.map(({ dataValues }) => dataValues);
  const users = await User.findAll();
  const users2 = users.map(({ dataValues }) => dataValues);
  const newUsers = users2.map(({ password, ...user }) => user);
  // https://stackoverflow.com/questions/18133635/remove-property-for-all-objects-in-array
  console.log(newUsers);
  const teste = newPosts.map((post) => {
    const result = {
      ...post,
      user: newUsers.find((user) => user.id === post.userId),
      categories: 1,
    };
    return result;
  });
  console.log(teste);

  return teste;
};
 
module.exports = { getUserId, createPost, validate, getAllPosts, getPostById };
