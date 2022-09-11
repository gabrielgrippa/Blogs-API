const express = require('express');

const categoryController = require('../controllers/categoryController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const categoryRoute = express.Router();

categoryRoute.post('/', tokenValidation, categoryController.addCategory);

module.exports = categoryRoute;
