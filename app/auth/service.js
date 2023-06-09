const User = require('../users/schema');
const bcryptjs = require('bcryptjs');
const BadRequestError = require('../../utils/errors/BadRequestError');
const jwt = require('jsonwebtoken');

exports.login = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ where: { email } });
  const passwordMatch = bcryptjs.compareSync(password, user.password);
  if (!passwordMatch) throw new BadRequestError('username or password incorrect!');
  const token = jwt.sign(user.getDetail(), process.env.JWT_SECRET, { algorithm: 'none' });
  return token;
};

exports.register = async (payload) => {
  const user = await User.store(payload);
  return user.getDetail();
};