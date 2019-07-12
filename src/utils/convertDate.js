function convertDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();

  return {
    date: date,
    day: date.getDate(),
    month: date.getMonth(),
    fullMonth: date.toLocaleString("en-gb", { month: "long" }),
    shortMonth: date.toLocaleString("en-gb", { month: "short" }),
    fullWeekday: date.toLocaleString("en-gb", { weekday: "long" }),
    weekday: date.toLocaleString("en-gb", { weekday: "short" }),
    year: date.getFullYear(),
    time: date.toLocaleTimeString("en-gb", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit"
    }),
    isoDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  };
}

export { convertDate };
