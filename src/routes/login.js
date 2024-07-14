const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

module.exports = async function login(req, res) {
  const { password, document } = req.body;

  if (!password || !document) return res.status(400).json({ error: 'Password and document are required' });

  const existentUser = await Users.findOne({ document }, { password: 1 }).catch(e => e);
  const compareUser = await bcrypt.compare(password, existentUser.password);

  if (!compareUser) return res.status(401).json({ error: 'Invalid credentials.' });

  const accessToken = await jwt.sign({ aud: existentUser._id }, process.env.SECRET, { expiresIn: '1h' });

  try {
    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Not possible to create user, please try again.' });
  }
}
