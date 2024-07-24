const hamMenu = document.getElementById("ham-menu");
const offScreenMenu = document.getElementById("off-screen-menu");
const dropHeader = document.getElementById("dropHeader");
const dropDown = document.getElementById("dropDown");

hamMenu.addEventListener("click", () =>{
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
    return;
});

/*Drop down for side panel */
dropHeader.addEventListener("click", () => {
  dropDown.classList.toggle("active");
});



//CALENDAR JAVASCRIPT
const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector('.calendar');
  const month_names = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  let month_picker = document.querySelector('#month-picker');
  const dayTextFormate = document.querySelector('.day-text-formate');
  const timeFormate = document.querySelector('.time-formate');
  const dateFormate = document.querySelector('.date-formate');
  
  month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
  };
  
  // Array of preset dates 
const presetDates = [
  //Jan
  "2024-01-09", //Re-Examinations
  "2024-01-10", //Re-Examinations
  "2024-01-11", //Re-Examinations
  "2024-01-12", //Re-Examinations
  "2024-01-13", //Re-Examinations
  "2024-01-14", //Re-Examinations
  "2024-01-15", //Re-Examinations
  "2024-01-16", //Re-Examinations
  "2024-01-17", //Re-Examinations
  "2024-01-18", //Re-Examinations
  "2024-01-19", //Re-Examinations
  //Jan

  //February
  "2024-02-05", //Classes start for 1st Year Students
  "2024-02-12", //Classes start for 2nd and 3rd Year Students
  "2024-02-15", //Academic Opening Pretoria
  //February

  //March
  "2024-03-18", //Exam Schedule Released
  "2024-03-21", //Human Rights Day
  "2024-03-22", //Campus Closed
  "2024-03-29", //Good Friday
  //March

  //April
  "2024-04-01", //Family Day
  "2024-04-02", //Last Day to Apply for Sick Test
  "2024-04-05", //Sick Test
  "2024-04-08", //Sick Test Results Released & Study Leave
  "2024-04-09", //Study Leave
  "2024-04-10", //Study Leave
  "2024-04-11", //Study Leave
  "2024-04-12", //Study Leave
  "2024-04-15", //Examinations
  "2024-04-16", //Examinations
  "2024-04-17", //Examinations
  "2024-04-18", //Examinations
  "2024-04-19", //Examinations
  "2024-04-27", //Freedom Day
  //April

  //May
  "2024-05-01", //Worker's day
  "2024-05-03", //Exam Results Released
  "2024-05-10", //Graduation
  "2024-05-17", //Career Day & Last Day to Apply for Exam Review
  "2024-05-21", //Exam Review Schedule Released
  "2024-05-24", //Exam Review 
  "2024-05-27", //Examination Schedule Released
  "2024-05-31", //Exam Review
  //May

  //June
  "2024-06-10", //Last Day to Apply for Sick Test
  "2024-06-14", //Sick Tests
  "2024-06-16", //National Youth Day
  "2024-06-17", //Campus is closed
  "2024-06-18", //Sick Test Results Released & Study Leave
  "2024-06-19", //Study Leave
  "2024-06-20", //Study Leave
  "2024-06-21", //Study Leave
  "2024-06-24", //Examinations
  "2024-06-25", //Examinations
  "2024-06-26", //Examinations
  "2024-06-27", //Examinations
  "2024-06-28", //Examinations
  //June

  //July
  "2024-07-19", //Exam Results Released
  //July

  //August
  "2024-08-02", //Career Day & Last Day to Apply for Exam Review
  "2024-08-06", //Exam Review Schedule Released
  "2024-08-09", //National Women's Day
  "2024-08-12", //Exam Schedule Released
  "2024-08-16", //Exam Review
  "2024-08-23", //Exam Review
  "2024-08-26", //Last Day to Apply for Sick Test
  "2024-08-30", //Sick Tests
  //August

  //September
  "2024-09-02", //Sick Test Results Released & Study Leave
  "2024-09-03", //Last Day to Apply for Special Permission & Study Leave
  "2024-09-04", //Study Leave
  "2024-09-05", //Study Leave
  "2024-09-06", //Study Leave
  "2024-09-09", //Examinations
  "2024-09-10", //Examinations
  "2024-09-11", //Examinations
  "2024-09-12", //Examinations
  "2024-09-13", //Examinations
  //September

  //October
  "2024-10-04", //Exam Results Released
  "2024-10-18", //Career Day & Last Day to Apply for Exam Review
  "2024-10-22", //Exam Review Schedule Released
  "2024-10-25", //Exam Review
  "2024-10-28", //Exam Schedule Released
  "2024-10-31", //Last Day to Apply for a Bursary
  //October

  //November
  "2024-11-01", //Exam Review
  "2024-11-11", //Last Day to Apply for Sick Test
  "2024-11-15", //Sick Test
  "2024-11-18", //Sick Test Results Released & Study Leave
  "2024-11-19", //Last Day to Apply for Special Permission & Study Leave
  "2024-11-20", //Study Leave
  "2024-11-21", //Study Leave
  "2024-11-25", //Examinations
  "2024-11-26", //Examinations
  "2024-11-27", //Examinations
  "2024-11-28", //Examinations
  "2024-11-29", //Examinations
  //November

  //December
  "2024-12-12", //Exam Results Released
  "2024-12-25", //Christmas Day
  //December
];
const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
  let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
  ];

  let currentDate = new Date();

  let month_picker = document.querySelector('#month-picker');
  month_picker.innerHTML = month_names[month];

  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      let day = document.createElement('div');

      if (i >= first_day.getDay()) {
          let date = i - first_day.getDay() + 1;
          let fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
          day.innerHTML = date;

          if (date === currentDate.getDate() &&
              year === currentDate.getFullYear() &&
              month === currentDate.getMonth()
          ) {
              day.classList.add('current-date');
          }

          if (presetDates.includes(fullDate)) {
              day.classList.add('preset-date');
          }
      }
      calendar_days.appendChild(day);
  }
};
  
  let month_list = calendar.querySelector('.month-list');
  month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
  
    month_list.append(month);
    month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
    };
  });
  
  (function() {
    month_list.classList.add('hideonce');
  })();
  document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  
  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);
  
  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  
  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
        2,
        '0'
      )}:${`${timer.getMinutes()}`.padStart(
        2,
        '0'
      )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);
  //CALENDAR JAVASCRIPT