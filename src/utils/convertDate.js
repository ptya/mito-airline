const months = {
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec"
};

function convertDate(dateString) {
  const dateObj = new Date(dateString);
  const monthId = dateObj.getMonth();
  const day = dateObj.getDate();
  const month = months[monthId];

  return { day: day, month: month };
}

export { convertDate };
