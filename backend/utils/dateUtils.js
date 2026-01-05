export const isToday = (dbDate) => {
  const today = new Date();
  const dateFromDb = new Date(dbDate);

  return (
    today.getFullYear() === dateFromDb.getFullYear() &&
    today.getMonth() === dateFromDb.getMonth() &&
    today.getDate() === dateFromDb.getDate()
  );
};
