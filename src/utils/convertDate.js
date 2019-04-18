function convertDate(dateString) {
  const date = new Date(dateString);

  return {
    day: date.getDate(),
    fullMonth: date.toLocaleString("en-us", { month: "long" }),
    month: date.toLocaleString("en-us", { month: "short" }),
    fullWeekday: date.toLocaleString("en-us", { weekday: "long" }),
    weekday: date.toLocaleString("en-us", { weekday: "short" }),
    year: date.getFullYear()
  };
}

export { convertDate };
