const postService = require('../services/postService');

const addPost = async (req, res) => {
  const { data } = req.user;
  const badValidation = await postService.validate(req.body);
  if (badValidation) return res.status(400).json({ message: badValidation });
  const id = await postService.getUserId(data);
  const post = await postService.createPost(req.body, id);
  return res.status(201).json(post);
};

const getAllPosts = async (_req, res) => {
  const result = await postService.getAllPosts();
  return res.status(200).json(result);
};

const getPostById = async (req, res) => {
  const result = await postService.getPostById(req.params.id);
  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(result);
};

const editPost = async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const result = await postService.editPost(req.body, req.params.id, req.user.data);
  if (!result) return res.status(401).json({ message: 'Unauthorized user' });

  return res.status(200).json(result);
};

module.exports = { addPost, getAllPosts, getPostById, editPost };
