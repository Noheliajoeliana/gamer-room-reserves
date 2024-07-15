function weekLimits(date) {

  const weekDay = date.getUTCDay();

  const daysFromMonday = (weekDay === 6) ? -2 : (weekDay - 1);

  const mondayDate = new Date(date.getTime() - daysFromMonday * 24 * 60 * 60 * 1000);
  const fridayDate = new Date(mondayDate.getTime() + 4 * 24 * 60 * 60 * 1000);

  mondayDate.setUTCHours(4, 0, 0, 0);
  fridayDate.setUTCHours(27, 59, 59, 999);

  return {
    monday: mondayDate.toISOString(),
    friday: fridayDate.toISOString()
  };
}

function validateDates(date) {
  if (typeof date === 'number' && date.toString().length < 16) return true;
  if (!Array.isArray(date)) return !!Date.parse(date);
  return date.every(d => validateDates(d));
}


module.exports = {
  weekLimits,
  validateDates
}