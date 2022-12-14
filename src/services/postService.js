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
  const data = await BlogPost.findAll({ raw: true });
  const result = await Promise.all(data.map(async (post) => {
    const blogPost = await getPostById(post.id);
    return blogPost;
  }));
  // https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
  return result;
};

const editPost = async (data, id, email) => {
  const { title, content } = data;
  const userId = await getUserId(email);
  const postToBeUpdated = await BlogPost.findOne({ where: { id }, raw: true });
  if (!postToBeUpdated) return;
  if (userId !== postToBeUpdated.userId) return undefined;
  await BlogPost.update({ title, content }, { where: { id } });
  const result = await getPostById(id);
  console.log(postToBeUpdated);
  return result;
};

const deletePost = async (id, email) => {
  const userId = await getUserId(email);
  const postToBeDeleted = await BlogPost.findOne({ where: { id }, raw: true });
  if (!postToBeDeleted) return ({ number: 404, message: 'Post does not exist' });
  if (userId !== postToBeDeleted.userId) return ({ number: 401, message: 'Unauthorized user' });
  await BlogPost.destroy(
    { where: { id } },
  );
  return undefined;
};
 
module.exports = { 
  getUserId, 
  createPost,
  validate,
  getAllPosts,
  getPostById,
  editPost,
  deletePost };
