const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/schema');
const BadRequestError = require('../../utils/errors/BadRequestError');

exports.login = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ where: { email } });
  const passwordMatch = bcryptjs.compareSync(password, user.password);
  if (!passwordMatch) throw new BadRequestError('username or password incorrect!');
  const token = jwt.sign(user.getDetail(), process.env.JWT_SECRET, { expiresIn: '24h' });
  return { user: user.getDetail(), token };
};

exports.register = async (payload) => {
  const user = await User.store(payload);
  return user.getDetail();
};
