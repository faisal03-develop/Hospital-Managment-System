

export const isToday = (dbDate) => {
  const today = new Date();
  const dateFromDb = new Date(dbDate);

  return (
    today.getFullYear() === dateFromDb.getFullYear() &&
    today.getMonth() === dateFromDb.getMonth() &&
    today.getDate() === dateFromDb.getDate()
  );
};


export const isNotPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  return selected >= today;
};
