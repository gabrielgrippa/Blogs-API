const postService = require('../services/postService');

const addPost = async (req, res) => {
  const { data } = req.user;
  const badValidation = await postService.validate(req.body);
  if (badValidation) return res.status(400).json({ message: badValidation });
  const id = await postService.getUserId(data);
  const post = await postService.createPost(req.body, id);
  return res.status(201).json(post);
};

module.exports = { addPost };
