const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Нет таких пользователей');
      }
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Не передан email или пароль');
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь уже существует');
      }
      bcrypt.hash(password, 10, (err, hash) => User.create({
        name, about, avatar, email, password: hash,
      })
        .then((userNew) => res.status(201).send(userNew)));
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(`${Object.values(err.errors)
            .map(() => err.message).join(', ')}`),
        );
      } next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(`${Object.values(err.errors)
            .map(() => err.message).join(', ')}`),
        );
      } next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new NotFoundError('Не передан email или пароль');
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Такого пользователя не существует');
      }
      bcrypt.compare(password, user.password, (err, isPasswordMatch) => {
        if (!isPasswordMatch) {
          return next(new UnauthorizedError('Неправильный логин или пароль'));
        }
        const token = generateToken(user._id);
        res.cookie('jwt', token, {
          maxAge: 604800000,
          httpOnly: true,
          sameSite: true,
        });
        return res.status(200).send(user);
      });
    })
    .catch(next);
};

const getUsersMe = (req, res, next) => {
  const _id = req.user;
  return User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      // const { name, about, avatar } = user;
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUsersMe,
};
