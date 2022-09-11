const express = require('express');

const userController = require('../controllers/userController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const userRoute = express.Router();

userRoute.post('/', userController.addUser);
userRoute.get('/', tokenValidation, userController.getAllUsers);
userRoute.get('/:id', tokenValidation, userController.getByUserId);

module.exports = userRoute;
