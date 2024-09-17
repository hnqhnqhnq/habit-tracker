const getHabitsUsingQuery = (user, query) => {
  const day = Object.keys(query)[0];
  const habits = user.habits.filter((habit) => {
    return habit.days.includes(day);
  });

  return habits;
};

module.exports = getHabitsUsingQuery;
