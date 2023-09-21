export const isDueTodayOrTomorrow = (date: string) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Set the time portion of the dates to 00:00:00
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  const dueDate = new Date(date);
  dueDate.setDate(dueDate.getDate() + 1);
  dueDate.setHours(0, 0, 0, 0);

  const isBetweenTodayAndTomorrow = dueDate >= today && dueDate <= tomorrow;

  return isBetweenTodayAndTomorrow;
};
