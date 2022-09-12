const express = require('express');

const postController = require('../controllers/postController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const postRoute = express.Router();

postRoute.post('/', tokenValidation, postController.addPost);
postRoute.get('/', tokenValidation, postController.getAllPosts);
postRoute.get('/:id', tokenValidation, postController.getPostById);
postRoute.put('/:id', tokenValidation, postController.editPost);
postRoute.delete('/:id', tokenValidation, postController.deletePost);

module.exports = postRoute;
