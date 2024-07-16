const $match = (startWeek, endWeek, screen) => ({
  startDate: { $gte: startWeek },
  endDate: { $lte: endWeek },
  screen
});

const $project =  {
  hour: {
    $dateToString: {
      date: '$startDate',
      format: '%H',
      timezone: 'America/Caracas'
    }
  },
  start: { $toLong: '$startDate' },
  end: { $toLong: '$endDate' },
  title: 1,
  id: '$_id',
  _id: 0,
  startWeek: 1,
  endWeek: 1,
  user: 1
}

const groupByHour = {
  _id: '$hour',
  v: { '$push': '$$ROOT' }
}


const groupInSingleObject = {
  _id: '',
  array: {
    $push: { k: '$_id', v: '$v' }
  }
}

const $replaceRoot = { newRoot: { $arrayToObject: '$array' } }


module.exports = function getParsedReservations(startWeek, endWeek, screen) {
  return [
    { $match: $match(new Date(startWeek), new Date(endWeek), screen) },
    { $project },
    { $group: groupByHour },
    { $group: groupInSingleObject },
    { $replaceRoot }
  ];
}