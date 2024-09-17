const getHabitsUsingQuery = (user, query) => {
  const day = Object.keys(query)[0];
  const habits = user.habits.filter((habit) => {
    return habit.days.includes(day) || habit.days.includes("All Days");
  });

  return habits;
};

module.exports = getHabitsUsingQuery;
