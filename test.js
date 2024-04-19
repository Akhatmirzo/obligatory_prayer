// ! ----------------------------------------------------------------

//* Calc Calendar
const increaseDateByOneDay = (dateString) => {
  const date = new Date(dateString);

  //* Kalendar hisoblash
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const isYear = isLeapYear(year);

  if (isYear && month == 2 && day == 29) {
    console.log(true);
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }

  date.setDate(date.getDate() + 1);

  return date.toISOString().slice(0, 10);
};


console.log(increaseDateByOneDay("2024-02-29"));