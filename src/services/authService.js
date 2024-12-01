const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
  const { username, email, password, language } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already in use');
  const user = new User({ username, email, password, language });
  await user.save();
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw new Error('Invalid email or password');
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};

module.exports = { registerUser, loginUser };
