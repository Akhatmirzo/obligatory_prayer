// ! ----------------------------------------------------------------

// *Calc Age
exports.calculateAge = (date) => {
  const splitDate = date.split("T");
  const [year, month, day] = splitDate[0].split("-");

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();

  let age = currentYear - year;

  //* Check if the birthday has occurred this year
  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age--;
  }

  return age;
};

// ! ----------------------------------------------------------------

//* Calc 12- age
exports.calc12_age = (date) => {
  const splitDate = date.split("T");
  const [year, month, day] = splitDate[0].split("-");

  let age12 = Number(year) + 12;

  return `${age12}-${month}-${day}`;
};

// ! ----------------------------------------------------------------

//* Kabisa yili
// exports.isLeapYear = (year) => {
//   return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
// };

// ! ----------------------------------------------------------------

//* Calc Calendar
exports.increaseDateByOneDay = (dateString) => {
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

// ! ----------------------------------------------------------------
