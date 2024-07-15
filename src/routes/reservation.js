const { Reservations } = require('../models');
const { validateDates, weekLimits } = require('../utils/dates');
const getParsedReservations = require('../pipelines/getParsedReservations');

async function getReservations(req, res) {
    const { date = new Date(), screen } = req.query;

    if (!date || !validateDates(date)) return res.status(400).send({ error: 'Invalid date to search in DB.'});

    const { monday, friday } = weekLimits(new Date(date));

    const reservationsForDay = await Reservations.aggregate(getParsedReservations(monday, friday, Number(screen))).catch(e => e);
    if (reservationsForDay instanceof Error) return res.status(422).send({ error: 'Not possible to get reservations for that day.' });

    return res.json(reservationsForDay);
}

async function postReservation(req, res) {
    const { startDate, endDate, screen, startWeek, endWeek } = req.body;
    const id = req.query.user;
    const name = req.query.username;

    if (!startDate || !endDate || !validateDates([startDate, endDate])) return res.status(400).json({ error: 'Invalid dates.' });
    if (!screen || typeof screen !== 'number' || screen < 1 || screen > 6) return res.status(400).send({ error: 'Invalid screen, please send a number between 1 and 6.' });
    if (new Date(endDate) - new Date(startDate) !== 3.6e6) return res.status(400).send({ error: 'Reservations must be of 1 hour.' });

    const existentReservation = await Reservations.find({ startDate, screen }).catch(e => e);
    if (existentReservation && (existentReservation instanceof Error || existentReservation.length > 0)) return res.status(409).json({ error: 'Reservation already exists.' });

    const reservation = new Reservations({
        startDate,
        startWeek,
        endWeek,
        endDate,
        user: id,
        title: name,
        screen
    });

    try {
        await reservation.save();
        return res.status(201).json({ message: 'Reservation created.' });
    } catch(error) {
        return res.status(500).json({ error: 'Not possible to create reservation, please try again.' });
    }
}


module.exports = {
    getReservations,
    postReservation
}