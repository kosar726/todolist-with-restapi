const router = require('express').Router();
const { body } = require('express-validator');

const userController = require('../controllers/auth');
const User = require('../model/user');

router.put('/register', [
  body('name').trim().not().isEmpty(),
  body('email').isEmail().withMessage('Please enter a valid email!')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
        .then(userDocument => {
          if (userDocument) {
            return Promise.reject('your E-mail already exists!')
          }
        })
    }).normalizeEmail(),
  body('password').trim().isLength({ min: 5 }),
  body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    })
], userController.register);

router.post('/login', userController.login)

module.exports = router