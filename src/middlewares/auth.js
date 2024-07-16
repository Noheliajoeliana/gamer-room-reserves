const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = async function authMiddleware(req, res, next) {

  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: 'No autenticado.'});

  const [_, accessToken] = authorization.split(' ');
  if (!accessToken) return res.status(401).json({ error: 'No autenticado.'});

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.SECRET);
  } catch(error) {
    if (error) return res.status(401).json({ error: 'No autenticado.' });
  }
  const { aud } = payload;

  const user = await Users.findOne({ _id: new ObjectId(aud) }, { fullName: 1, _id: 1 }).catch(e => e);
  if (!user || (user instanceof Error)) return res.status(404).json({ error: 'No autenticado.' });

  req.params.user = user;
  next();
}