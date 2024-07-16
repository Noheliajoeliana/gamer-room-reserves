const bcrypt = require('bcrypt');

const { Users } = require('../models');

module.exports = async function registerUsers(req, res) {
  const { fullName, document, password, career } = req.body;

  if (!fullName || !document || !password || !career) return res.status(400).json({ error: 'Campos requeridos: numbre, cédula, carrera y contraseña.' })

  const userAlreadyExists = await Users.findOne({ document }).catch(e => e);
  if (userAlreadyExists) return res.status(409).json({ error: 'El usuario ya existe.' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new Users({
    fullName,
    document,
    password: hashedPassword,
    career
  });

  try {
    await user.save();
    res.status(201).json({ message: 'Usuario creado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'No fue posible crear usuario, por favor intente nuevamente.' });
  }
}
