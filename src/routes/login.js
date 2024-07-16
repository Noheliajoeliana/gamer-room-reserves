const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

module.exports = async function login(req, res) {
  const { password, document } = req.body;

  if (!password || !document) return res.status(400).json({ error: 'Contraseña y cédula requeridos.' });

  const existentUser = await Users.findOne({ document }, { password: 1 }).catch(e => e);
  if (!existentUser || (existentUser instanceof Error) || !('password' in existentUser)) return res.status(404).json({ error: 'Usuario no encontrado.' });

  const compareUser = await bcrypt.compare(password, existentUser.password);

  if (!compareUser) return res.status(401).json({ error: 'Credenciales inválidas.' });

  const accessToken = await jwt.sign({ aud: existentUser._id }, process.env.SECRET, { expiresIn: '1h' });

  try {
    res.status(201).json({ accessToken, user: existentUser._id });
  } catch (error) {
    res.status(500).json({ error: 'No fue posible crear el usuario, por favor intente nuevamente.' });
  }
}
