const express = require('express');

const postController = require('../controllers/postController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const postRoute = express.Router();

postRoute.post('/', tokenValidation, postController.addPost);

module.exports = postRoute;
