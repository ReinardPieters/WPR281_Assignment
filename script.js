const hamMenu = document.getElementById("ham-menu");
const offScreenMenu = document.getElementById("off-screen-menu");
const dropHeader = document.getElementById("dropHeader");
const dropDown = document.getElementById("dropDown");


hamMenu.addEventListener("click", () =>{
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
    return;
});


document.addEventListener('DOMContentLoaded', () => {
  // Fetch the content of the text file (assuming it's stored locally as 'courses.txt')
  fetch('courses.txt')
      .then(response => response.text())
      .then(data => {
          // Split the data by line breaks
          const lines = data.split('\n');
          // Array to hold parsed courses
          const courses = [];

          // Temporary object to hold course information
          let course = {};
          let currentField = 'id';

          // Debugging statement to see the lines array
          console.log('Lines:', lines);

          // Loop through each line and parse the data
          lines.forEach(line => {
              if (line.trim() === '') return; // Skip empty lines

              if (line.includes(';')) {
                  // Save the last field (location) and push the completed course object to the array
                  course.location = line.replace(';', '').trim();
                  courses.push(course);
                  // Reset the course object for the next course
                  course = {};
                  currentField = 'id'; // Reset the field tracker
              } else {
                  switch (currentField) {
                      case 'id':
                          course.id = line.trim();
                          currentField = 'coursename';
                          break;
                      case 'coursename':
                          course.coursename = line.trim();
                          currentField = 'coursedesc';
                          break;
                      case 'coursedesc':
                          course.coursedesc = line.trim();
                          currentField = 'duration';
                          break;
                      case 'duration':
                          course.duration = line.trim();
                          currentField = 'level';
                          break;
                      case 'level':
                          course.level = line.trim();
                          currentField = 'credits';
                          break;
                      case 'credits':
                          course.credits = line.trim();
                          currentField = 'saqaid';
                          break;
                      case 'saqaid':
                          course.saqaid = line.trim();
                          break;
                  }
              }
          });

          // Debugging statement to see the courses array
          console.log('Courses:', courses);

          // Generate HTML content
          const mainContainer = document.querySelector('.main');
          mainContainer.innerHTML = courses.map(course => `
              <a class="${course.id}" href="#">
                  <div id="courses">
                      <h1 id="coursename">${course.coursename}</h1>
                      <div id="coursedisc">${course.coursedesc}</div>
                  </div>
                  <div class="ncifinfo">
                      <div class="duration">
                          <span class="material-symbols-outlined">calendar_clock</span>
                          <p>Duration: ${course.duration}</p>
                      </div>
                      <div class="level">
                          <span class="material-symbols-outlined">brightness_alert</span>
                          <p>NQF: ${course.level}</p>
                      </div>
                      <div class="credits">
                          <span class="material-symbols-outlined">article</span>
                          <p>Credits: ${course.credits}</p>
                      </div>
                      <div class="saqaid">
                          <span class="material-symbols-outlined">assured_workload</span>
                          <p>SAQA ID: ${course.saqaid}</p>
                      </div>
                      <div class="location">
                          <span class="material-symbols-outlined">map</span>
                          <p>Location: ${course.location}</p>
                      </div>
                  </div>
              </a>
          `).join('');
          const coursedetails = document.querySelector(".offscreencourse")

          // Add click event listeners to all <a> elements
          const links = mainContainer.querySelectorAll('a');
          links.forEach(link => {
              link.addEventListener('click', (event) => {
                  event.preventDefault();
                  if (link.classList.contains('nif')) {
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');
                    coursedetails.innerHTML = `
                        <div class="head">
                          <h1>National Certificate: Information Technology</h1>
                          <button class="test2">Go back to main</button>
                        </div>
                        <div class="body">
                          <div class="info">
                            <p>Our certificate programmes offer an affordable option to quickly launch your IT career. They also serve as a stepping stone into one of our other programmes if you did not meet the necessary entry requirements.</p>
                            <p>Accredited by MICT SETA and aligned on the NQF with the South African Qualifications Authority, these certificates are created in line with our mission to promote gainful employment by training young people to understand, use and apply IT in effective, efficient, and ethical ways.</p>
                            <h1>Overview</h1>
                            <p>On completion of this qualification, you will possess a specialised set of skills that will allow you to work in areas of systems development with confidence. You will gain a solid grasp of computer industry concepts and learn to expertly design, develop, test, and document software solutions needed in today’s business environment. You will also gain the necessary undergraduate foundation to further your studies in the IT field, should you wish.</p>
                            <h1>FURTHER STUDY OPPORTUNITIES</h1>
                            <p>Successful completion of this programme yields the exit level outcomes described below. Upon completion of the Higher Certificate: Information Technology (NQF level 5) in Systems Development, the student can apply for Recognition of Prior Learning from Belgium Campus iTversity in order to continue his/her studies at Belgium Campus in one of the other programmes offered by the institution. Diploma in Information Technology and Higher Certificate: IT (Database Development)</p>
                           </div>
                          <div class="coursemodules">
                          <h1>Modules</h1>
                          <table>
                          <tr>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>NQF</th>
                            <th>Credits</th>
                            <th>Prerequisites</th>
                            <th>Completion</th>
                          </tr>
                          <tr>
                            <td>Marhematics 151</td>
                            <td>MAT151</td>
                            <td>5</td>
                            <td>12</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c1-13" type="checkbox">
                              <label for="c1-13"></label>
                             </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Computer Architecture 151</td>
                            <td>COA151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c1-13" type="checkbox">
                              <label for="c1-13"></label>
                             </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Database Development 151</td>
                            <td>DBD151</td>
                            <td>5</td>
                            <td>18</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c1-13" type="checkbox">
                              <label for="c1-13"></label>
                             </div>
                            </td>
                          </tr>
                          <tr>
                            <td>End User Computing 151</td>
                            <td>EUC151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c1-13" type="checkbox">
                              <label for="c1-13"></label>
                             </div>
                            </td>
                          </tr>
                         <tr>
                            <td>English Communication 151</td>
                            <td>ENG151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c1-13" type="checkbox">
                              <label for="c1-13"></label>
                             </div>
                            </td>
                          </tr>
                          </table>
                          </div>
                        </div>
                        `;
                  } else if (link.classList.contains('bcomp')) {
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');
                    coursedetails.innerHTML = `
                    <div class="head">
                      <h1>Bachelor of Computing</h1>
                      <button class="test2">Go back to main</button>
                    </div>
                    <div class="body">
                      <div class="info">
                        <h1>Heading here</h1>
                        <p>Discription here</p>
                       </div>
                      <div class="coursemodules">
                      <h1>tables</h1>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                      </tr>
                      <tr>
                        <td>Marhematics 151</td>
                        <td>MAT151</td>
                        <td>5</td>
                        <td>12</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c1-13" type="checkbox">
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      </tr>
                      </table>
                      </div>
                    </div>
                    `;
                    
                  }else if (link.classList.contains('bit')) {
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');
                  }else if (link.classList.contains('dit')) {
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');
                  }else{
                    alert("404: file not found")
                  }
                  document.querySelector(".test2").addEventListener("click",()=>{
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');  
                  });
              });
          });
      })
      .catch(error => console.error('Error fetching the course data:', error));
});

/*Drop down for side panel */
dropHeader.addEventListener("click", () => {
  dropDown.classList.toggle("active");
  document.querySelector(".sidePanel").classList.toggle("active")
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


  //HIDE PURUPLE BLOCK NAVBAR
   window.addEventListener('scroll', hideDivOnScroll);
         const hideDistance = 50;
         function hideDivOnScroll() {
             const myDiv = document.getElementById('off-screen-menu');
             if (window.scrollY > hideDistance) {
                 myDiv.classList.add('hiddenPurple');
             } else {
                 myDiv.classList.remove('hiddenPurple');
             }
         }
         window.addEventListener('scroll', hideDivOnScroll);
  //HIDE PURPLE BLOCK NAVBAR

  //EVENTS JS

document.addEventListener("DOMContentLoaded", function(){
  
  // Array of preset dates and assigned meaning 
  const presetDatesMeaning = [
    //Jan
    {Date: "2024-01-09",
    Meaning: "Re-Examinations"},
    {Date: "2024-01-10",
    Meaning: "Re-Examinations"},
    {Date: "2024-01-11",
    Meaning: "Re-Examinations"},  
    {Date: "2024-01-12",
    Meaning: "Re-Examinations"},
    {Date:  "2024-01-13",
    Meaning: "Re-Examinations"},
    {Date:   "2024-01-14",
    Meaning: "Re-Examinations"},
    {Date: "2024-01-15",
    Meaning: "Re-Examinations"},
    {Date: "2024-01-16",
    Meaning: "Re-Examinations"},
    {Date: "2024-01-17",
    Meaning: "Re-Examinations"},
    {Date: "2024-01-18",
    Meaning: "Re-Examinations"},
    {Date: "2024-01-19",
    Meaning: "Re-Examinations"},                      
    //Jan
    
    //February
    {Date: "2024-02-05",
    Meaning: "Classes start for 1st Year Students"},
    {Date: "2024-02-12",
    Meaning: "Classes start for 2nd and 3rd Year Students"},
    {Date: "2024-02-15",
    Meaning: "Academic Opening Pretoria"},
    //February
    
    //March
    {Date: "2024-03-18",
    Meaning: "Exam Schedule Released"},
    {Date: "2024-03-21",
    Meaning: "Human Rights Day"},
    {Date: "2024-03-22",
    Meaning: "Campus Closed"},  
    {Date: "2024-03-29",
    Meaning: "Good Friday"},
    //March
    
    //April
    {Date: "2024-04-01",
    Meaning: "Family Day"},
    {Date: "2024-04-02",
    Meaning: "Last Day to Apply for Sick Test"},
    {Date: "2024-04-05",
    Meaning: "Sick Test"},  
    {Date: "2024-04-08",
    Meaning: "Sick Test Results Released & Study Leave"},
    {Date:  "2024-04-09",
    Meaning: "Study Leave"},
    {Date:   "2024-04-10",
    Meaning: "Study Leave"},
    {Date: "2024-04-11",
    Meaning: "Study Leave"},
    {Date: "2024-04-12",
    Meaning: "Study Leave"},
    {Date: "2024-04-15",
    Meaning: "Examinations"},
    {Date: "2024-04-16",
    Meaning: "Examinations"},
    {Date: "2024-04-17",
    Meaning: "Examinations"},    
    {Date: "2024-04-18",
    Meaning: "Examinations"},    
    {Date: "2024-04-19",
    Meaning: "Examinations"},    
    {Date: "2024-04-27",
    Meaning: "Freedom Day"},    
    //April
    
    //May
    {Date:   "2024-05-01",
    Meaning: "Worker's day"},
    {Date: "2024-05-03",
    Meaning: "Exam Results Released"},
    {Date: "2024-05-10",
    Meaning: "Graduation"},
    {Date: "2024-05-17",
    Meaning: "Career Day & Last Day to Apply for Exam Review"},
    {Date: "2024-05-21",
    Meaning: "Exam Review Schedule Released"},
    {Date: "2024-05-24",
    Meaning: "Exam Review"},    
    {Date: "2024-05-27",
    Meaning: "Examination Schedule Released"},       
    {Date: "2024-05-31",
    Meaning: "Exam Review"},   
    //May
    
    //June
    {Date: "2024-06-10", 
    Meaning: "Last Day to Apply for Sick Test" },
    {Date: "2024-06-14", 
    Meaning: "Sick Tests" },
    {Date: "2024-06-16", 
    Meaning: "National Youth Day" },
    {Date: "2024-06-17", 
    Meaning: "Campus is closed" },
    {Date: "2024-06-18",
    Meaning: "Sick Test Results Released & Study Leave" },
    {Date: "2024-06-19", 
    Meaning: "Study Leave" },
    {Date: "2024-06-20", 
    Meaning: "Study Leave" },
    {Date: "2024-06-21", 
    Meaning: "Study Leave" },
    {Date: "2024-06-24", 
    Meaning: "Examinations" },
    {Date: "2024-06-25", 
    Meaning: "Examinations" },
    {Date: "2024-06-26", 
    Meaning: "Examinations" },
    {Date: "2024-06-27", 
    Meaning: "Examinations" },
    {Date: "2024-06-28", 
    Meaning: "Examinations" },
    //June
    
    //July
    {Date: "2024-07-19",
    Meaning: "Exam Results Released"},  
    //July
    
    //August
    {Date: "2024-08-02", 
    Meaning: "Career Day & Last Day to Apply for Exam Review" },
    {Date: "2024-08-06", 
    Meaning: "Exam Review Schedule Released" },
    {Date: "2024-08-09", 
    Meaning: "National Women's Day" },
    {Date: "2024-08-12", 
    Meaning: "Exam Schedule Released" },
    {Date: "2024-08-16", 
    Meaning: "Exam Review" },
    {Date: "2024-08-23", 
    Meaning: "Exam Review" },
    {Date: "2024-08-26", 
    Meaning: "Last Day to Apply for Sick Test" },
    {Date: "2024-08-30", 
    Meaning: "Sick Tests" },
    //August
    
    //September
    {Date: "2024-09-02", 
    Meaning: "Sick Test Results Released & Study Leave" },
    {Date: "2024-09-03", 
    Meaning: "Last Day to Apply for Special Permission & Study Leave" },
    {Date: "2024-09-04", 
    Meaning: "Study Leave" },
    {Date: "2024-09-05", 
    Meaning: "Study Leave" },
    {Date: "2024-09-06", 
    Meaning: "Study Leave" },
    {Date: "2024-09-09", 
    Meaning: "Examinations" },
    {Date: "2024-09-10", 
    Meaning: "Examinations" },
    {Date: "2024-09-11", 
    Meaning: "Examinations" },
    {Date: "2024-09-12", 
    Meaning: "Examinations" },
    {Date: "2024-09-13", 
    Meaning: "Examinations" },
    //September
    
    //October
    {Date: "2024-10-04", 
    Meaning: "Exam Results Released" },
    {Date: "2024-10-18", 
    Meaning: "Career Day & Last Day to Apply for Exam Review" },
    {Date: "2024-10-22", 
    Meaning: "Exam Review Schedule Released" },
    {Date: "2024-10-25", 
    Meaning: "Exam Review" },
    {Date: "2024-10-28", 
    Meaning: "Exam Schedule Released" },
    {Date: "2024-10-31", 
    Meaning: "Last Day to Apply for a Bursary" },
    //October
    
    //November
    {Date: "2024-11-01", 
    Meaning: "Exam Review" },
    {Date: "2024-11-11", 
    Meaning: "Last Day to Apply for Sick Test" },
    {Date: "2024-11-15", 
    Meaning: "Sick Test" },
    {Date: "2024-11-18", 
    Meaning: "Sick Test Results Released & Study Leave" },
    {Date: "2024-11-19", 
    Meaning: "Last Day to Apply for Special Permission & Study Leave" },
    {Date: "2024-11-20", 
    Meaning: "Study Leave" },
    {Date: "2024-11-21", 
    Meaning: "Study Leave" },
    {Date: "2024-11-25", 
    Meaning: "Examinations" },
    {Date: "2024-11-26", 
    Meaning: "Examinations" },
    {Date: "2024-11-27", 
    Meaning: "Examinations" },
    {Date: "2024-11-28", 
    Meaning: "Examinations" },
    {Date: "2024-11-29", 
    Meaning: "Examinations" },
    //November
    
    //December
    {Date: "2024-12-12",
    Meaning: "Exam Results Released"},  
    {Date: "2024-12-25",
    Meaning: "Christmas Day"}
    //December
  ];

// Parse the dates and sort them
const currentDate = new Date();
const futureDates = presetDatesMeaning
  .map(event => ({ ...event, Date: new Date(event.Date) }))
  .filter(event => event.Date >= currentDate)
  .sort((a, b) => a.Date - b.Date)
  .slice(0, 3);

// Display the nearest future dates
document.getElementById('date1').textContent = `${futureDates[0].Date.getDate()} ${futureDates[0].Meaning}`;
document.getElementById('date2').textContent = `${futureDates[1].Date.getDate()} ${futureDates[1].Meaning}`;
document.getElementById('date3').textContent = `${futureDates[2].Date.getDate()} ${futureDates[2].Meaning}`;
});
//EVENTS JS
