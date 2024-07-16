const express = require('express');
const cors = require('cors');
const { mongooseConnection } = require('./models');
const {
  registerUser,
  login,
  getReservations,
  postReservation,
  removeReservation
} = require('./routes');
const authMiddleware = require('./middlewares/auth');

const port = process.env.PORT;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongooseConnection();

app.get('/', (req, res) => res.json({ message: 'Bienvenido al sistema de reservas UBA.' }))

app.post('/register', registerUser);
app.post('/login', login);
app.get('/reservations', authMiddleware, getReservations);
app.post('/reservations', authMiddleware, postReservation);
app.delete('/reservations/:id', authMiddleware, removeReservation);


app.listen(port, () => {
  console.log(`APP LISTENING IN ${port}`);
});