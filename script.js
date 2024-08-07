const hamMenu = document.getElementById("ham-menu");
const offScreenMenu = document.getElementById("off-screen-menu");
const dropHeader = document.getElementById("dropHeader");
const dropDown = document.getElementById("dropDown");

fetch('http://localhost:3000/getAssignedCourse', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userID: localStorage.getItem('UserId') // replace with the actual user ID
  })
})
.then(response => response.json())
.then(data => {
  var courseDate;
  var CourseName;
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    if(data[i].course == 1){
       courseDate = new Date('dec 01, 2024 00:00:00');
       CourseName = "Bachelor of Computing"
    }
    else if(data[i].courseid == 2){
      courseDate = new Date('sep 01, 2024 00:00:00');
      CourseName = "National Certificate: Information Technology"
    }
    else if(data[i].courseid == 3){
      courseDate = new Date('nov 01, 2024 00:00:00');
      CourseName = "Bachelor of Information Technology"
    }
    else if(data[i].courseid == 4){
      courseDate = new Date('oct 01, 2024 00:00:00');
      CourseName = "Diploma for Information Technology"
    }
    else if(data[i].courseid == 5){
      courseDate = new Date('jan 01, 2025 00:00:00');
      CourseName = "Diploma for Deaf Students"
    }
    else if(data[i].CourseID == 6){
      courseDate = new Date('feb 01, 2025 00:00:00');
      CourseName = "National Certificate: Systems Developer"
    }
    else{
      console.log('Course does not exist');
    }
    
  }

  //CourseName stuff
  var courseName = document.getElementById("courseName");
  courseName.innerHTML = CourseName;
  //CourseName stuff

  //====================================================================================
  // Count down timer stuff 

  const dateTest = courseDate // Date constants add more if you want

  setInterval(function (){ //function to refresh the counter every second
    setCountDown(dateTest);
  },1000);

  function setCountDown(CountingTime){ //function to calculate the time left
    let now = new Date();
    let timeleft = CountingTime - now ;

    let seconds =Math.floor(timeleft/1000);
    let minutes =Math.floor(timeleft/(1000*60));
    let hours =Math.floor(timeleft/(1000*60*60));
    let days =Math.floor(timeleft/(1000*60*60*24));


    let daysDisplay = days;
    let hoursDisplay = hours - (days*24); // Subtract existing days
    let minutesDisplay = minutes - (hours*60);// subtract exiting hours
    let secDisplay = seconds - (minutes*60);// subtract existing minutes



    document.getElementById('day').textContent= daysDisplay; 
    document.getElementById('hour').textContent= hoursDisplay;
    document.getElementById('minute').textContent= minutesDisplay;
    document.getElementById('second').textContent= secDisplay;

  }
  //End of count down timer
  //====================================================================================

}) // data will be the assigned course IDs
.catch(error => console.error('Error:', error));


document.querySelector("#apply").addEventListener('click',()=>{
  if(localStorage.getItem('username')== null){
    alert('You have to sign in first')
    window.location.href = 'login-singup.html'
  }else{
    window.location.href = 'Apply.html'
  }
})
// const x = localStorage.getItem('userID')
let status = document.createElement('p')
document.querySelector(".logOutContainer").appendChild(status)
if(localStorage.getItem('username') !== null){
  status.textContent = "Welcome, " + localStorage.getItem('username') + "!"
} else{ 
  status.textContent = "Not logged In"  
}
document.querySelector("#LogOut").addEventListener('click',()=>{
  if (localStorage.getItem('username')==null && localStorage.getItem('UserId')==null){
    alert("You are not logged in");
  } else{
    localStorage.removeItem('username');
    localStorage.removeItem('UserId')
    status.textContent = "Not logged In"  
    alert("Succesfully logged out")
  }
})

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
                    <section id='content'>
                        <div class="head">
                          <h1>Certificate: Information Technology (Database Development)</h1>
                          <button class="test3" id="print">Print Course</button>
                          <button class="test2">Go back to main</button>
                        </div>
                        <div class="body">
                          <div class="info">
                            <p>This Higher Certificate in IT is created in line with Belgium Campus’s mission to train young people to understand, use and apply ICT effectively, efficiently and in ethical ways, leading to gainful employment.</p>
                            <h1>Overview</h1>
                            <p>The amount of data in the world is increasing at an exponential rate. The emergence of big data has completely transformed how companies do business and understand their customers, with companies using large volumes of data to identify trends and patterns and predict future consumer behaviour. With the above in mind, it is not surprising that the demand for skilled data experts with advanced database skills is ever-increasing. This qualification will give you these skills and allow you to enter the job market quickly. The knowledge and skills you gain will equip you to solve operational business problems in the data science space, allowing you to thrive in today’s business environment.</p>
                            <h1>FURTHER STUDY OPPORTUNITIES</h1>
                            <p>Successful completion of this programme yields the exit level outcomes described below.  Upon completion of the Higher Certificate: Information Technology (NQF level 6) in Database Development, the student can apply for Recognition of Prior Learning from Belgium Campus iTversity in order to continue his/her studies at Belgium Campus in one of the other programmes offered by the institution.
                            <ul></ul>
                            <li>Diploma in Information Technology</li>
                            <li>Bachelor of Information Technology</li>
                            <li>Bachelor of Computing</li>
                            </p>
                           </div>
                          <div class="coursemodules">
                          <h1>Modules</h1>
                          <br>
                          <h2>First Year</h2>
                          <table>
                          <tr>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>NQF</th>
                            <th>Credits</th>
                            <th>Prerequisites</th>
                            <th>Completion</th>
                            <th>Study Guide</th>
                          </tr>
                          <tr>
                            <td>Information Systems 251</td>
                            <td>INF251</td>
                            <td>6</td>
                            <td>12</td>
                            <td>INF122</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c001" type="checkbox" onclick='checkBoxStrike("c001")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Information-Systems-251-INF251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Innovation and Leadership 201</td>
                            <td>INL201</td>
                            <td>6</td>
                            <td>5</td>
                            <td>INL102</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c002" type="checkbox" onclick='checkBoxStrike("c002")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Innovation-and-Leadership-201-INL201.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Operating Systems 251</td>
                            <td>OPS251</td>
                            <td>6</td>
                            <td>7</td>
                            <td>INF121</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c003" type="checkbox" onclick='checkBoxStrike("c003")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Operating-Systems-251-OPS251.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                          <tr>
                            <td>Project 251</td>
                            <td>PRJ251</td>
                            <td>6</td>
                            <td>10</td>
                            <td>PMM251</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c004" type="checkbox" onclick='checkBoxStrike("c004")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Project-251-PRJ251.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                         <tr>
                            <td>Project Management 251</td>
                            <td>PMM251</td>
                            <td>6</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c005" type="checkbox" onclick='checkBoxStrike("c005")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Project-Management-251-PMM251.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                           <tr>
                            <td>Security 251</td>
                            <td>SEC251</td>
                            <td>6</td>
                            <td>8</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c006" type="checkbox" onclick='checkBoxStrike("c006")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Security-251-SEC251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Mathematics 151</td>
                            <td>MAT151</td>
                            <td>5</td>
                            <td>12</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c007" type="checkbox" onclick='checkBoxStrike("c007")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Mathematics-151-MAT151.pdf" download class="btn btn--download">Download</a></td> 
                          </tr>
                          <th colspan = 7>Fundamentals</th>
                           <tr>
                            <td>Database Development 251</td>
                            <td>DBD251</td>
                            <td>6</td>
                            <td>11</td>
                            <td>DBD251</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c008" type="checkbox" onclick='checkBoxStrike("c008")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Database-Development-251-DBD251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Database Models 251</td>
                            <td>DBM251</td>
                            <td>5</td>
                            <td>7</td>
                            <td>DBM251</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c009" type="checkbox" onclick='checkBoxStrike("c009")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Database-Models-251-DBM251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Programming 251</td>
                            <td>PRG251</td>
                            <td>6</td>
                            <td>12</td>
                            <td>PRG122</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c010" type="checkbox" onclick='checkBoxStrike("c010")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Programming-251-PRG251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Programming 252</td>
                            <td>PRG252</td>
                            <td>6</td>
                            <td>12</td>
                            <td>DBD251, PRG251</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c011" type="checkbox" onclick='checkBoxStrike("c011")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Programming-252-PRG252.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Web Programming 251</td>
                            <td>WPR251</td>
                            <td>6</td>
                            <td>10</td>
                            <td>DBD251, PRG121, WPR121</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c012" type="checkbox" onclick='checkBoxStrike("c012")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Web-Programming-251-WPR251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Web Programming 252</td>
                            <td>WPR252</td>
                            <td>6</td>
                            <td>11</td>
                            <td>WPR251</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c013" type="checkbox" onclick='checkBoxStrike("c013")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Web-Programming-252-WPR252.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <th colspan = 7> Electives (Choose one of)</th>
                          <tr>
                            <td>Enterprise Systems 251</td>
                            <td>ERP251</td>
                            <td>6</td>
                            <td>8</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c014" type="checkbox" onclick='checkBoxStrike("c014")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Enterprise-Systems-251-ERP251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Internet of Things 251</td>
                            <td>IOT251</td>
                            <td>6</td>
                            <td>8</td>
                            <td>WPR251, PRG121</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c015" type="checkbox" onclick='checkBoxStrike("c015")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Internet-of-Things-251-IOT251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          </table>
                          </div>
                        </div>
                        <div id="video">
                        <iframe class="youtube" src="https://www.youtube.com/embed/5DseUk4Jvw4?si=l78fFcReG-_KPHVi"></iframe>
                        </div>
                      </section>
                        `;
                        const UserID = localStorage.getItem('UserId');

                        fetch('http://localhost:3000/getCompletedCourses', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ userID: UserID })
                        })
                        .then(response => response.json())
                        .then(data => {
                          console.log(data.completedCourses)
                          for(i=0;i<data.completedCourses.length;i++){
                            if(data.completedCourses[i].Completed===false){
                              document.getElementById(`c00${i+1}`).checked = false;
                            }else{
                              document.getElementById(`c00${i+1}`).checked = true;
                            }
                          }
                        })
                        .catch(error => console.error(error));

                  } else if (link.classList.contains('bcomp')) {
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');
                    coursedetails.innerHTML = `
                    <section id='content'>
                    <div class="head">
                      <h1>Bachelor of Computing</h1>
                      <button class="test3" id="print">Print Course</button>
                      <button class="test2">Go back to main</button>
                    </div>
                    <div class="body">
                      <div class="info">
                      <p>Our Bachelor of Computing degree will teach you the essential computing skills of troubleshooting and formulating viable solutions. Additionally, you will learn to apply theories and integrate them in real-world environments, across multiple disciplines, by presenting best practices and solutions.</p>
                        <h1>Overview</h1>
                        <p>You will gain sound theoretical knowledge grounded in real-world applications. Furthermore, the practical assignments and projects you will complete are congruent with daily practices in the working world, providing you with business-specific and soft skills. These skills include communication skills, customer satisfaction training, the ability to work as part of a team, and the ability to teach others.  Moreover, in the fourth year of your Bachelor of Computing, you will have the remarkable opportunity to complete an internship at a national or international company. Additionally, you will conduct academic research and present your findings in a formal dissertation.</p>
                       </div>
                      <div class="coursemodules">
                      <h1>Modules</h1>
                      <br>
                      <h2>First Academic Year</h2>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <th colspan = 7>Core</th>
                      <tr>
                        <td>Academic Writing 181</td>
                        <td>ACW181</td>
                        <td>5</td>
                        <td>4</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c016" type="checkbox" onclick='checkBoxStrike("c016")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Academic-Writing-181-ACW181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Computer Architecture 181</td>
                        <td>COA181</td>
                        <td>5</td>
                        <td>4</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c017" type="checkbox" onclick='checkBoxStrike("c017")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Computer-Architecture-181-COA181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Database Development 181</td>
                        <td>DBD181</td>
                        <td>5</td>
                        <td>12</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c018" type="checkbox" onclick='checkBoxStrike("c018")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Database-Development-181-DBD181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Information Systems 181</td>
                        <td>INF181</td>
                        <td>5</td>
                        <td>12</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c019" type="checkbox" onclick='checkBoxStrike("c019")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Information-Systems-181-INF181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 101</td>
                        <td>INL101</td>
                        <td>5</td>
                        <td>5</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c020" type="checkbox" onclick='checkBoxStrike("c020")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Innovation-and-Leadership-101-INL101.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 102</td>
                        <td>INL102</td>
                        <td>5</td>
                        <td>5</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c021" type="checkbox" onclick='checkBoxStrike("c021")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Innovation-and-Leadership-102-INL102.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Linear Programming 181</td>
                        <td>LPR181</td>
                        <td>5</td>
                        <td>11</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c022" type="checkbox" onclick='checkBoxStrike("c022")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Linear-Programming-181-LPR181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Mathematics 181</td>
                        <td>MAT181</td>
                        <td>5</td>
                        <td>11</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c023" type="checkbox" onclick='checkBoxStrike("c023")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Mathematics-181-MAT181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Networking Development 181</td>
                        <td>NWD181</td>
                        <td>5</td>
                        <td>8</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c024" type="checkbox" onclick='checkBoxStrike("c024")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Network-Development-181-NWD181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 181</td>
                        <td>PRG181</td>
                        <td>5</td>
                        <td>16</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c025" type="checkbox" onclick='checkBoxStrike("c025")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Programming-181-PRG181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 182</td>
                        <td>PRG182</td>
                        <td>5</td>
                        <td>9</td>
                        <td>PRG181</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c026" type="checkbox" onclick='checkBoxStrike("c026")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Programming-182-PRG182.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Statistics 181</td>
                        <td>STA181</td>
                        <td>5</td>
                        <td>4</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c027" type="checkbox" onclick='checkBoxStrike("c027")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Statistics-181-STA181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Web Programming 181</td>
                        <td>WPR181</td>
                        <td>5</td>
                        <td>12</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c028" type="checkbox" onclick='checkBoxStrike("c028")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Web-Programming-181-WPR181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Electives (Choose one of)</th>
                      <tr>
                        <td>Business Management 181</td>
                        <td>BUM181</td>
                        <td>5</td>
                        <td>7</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c029" type="checkbox" onclick='checkBoxStrike("c029")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Business-Management-181-BUM181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Entrepreneurship 181</td>
                        <td>ENT181</td>
                        <td>5</td>
                        <td>7</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c030" type="checkbox" onclick='checkBoxStrike("c030")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/1st Year/Entrepreneurship-181-ENT181.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>

                      <br>

                      <h3>Second Academic Year</h3>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <th colspan = 7>Core</th>
                      <tr>
                        <td>Database Development 281</td>
                        <td>DBD281</td>
                        <td>6</td>
                        <td>15</td>
                        <td>DBD181</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c031" type="checkbox" onclick='checkBoxStrike("c031")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Database-Development-281-DBD281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Information Systems 281</td>
                        <td>INF281</td>
                        <td>6</td>
                        <td>12</td>
                        <td>INF181</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c032" type="checkbox" onclick='checkBoxStrike("c032")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Information-Systems-281-INF281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 201</td>
                        <td>INL201</td>
                        <td>6</td>
                        <td>5</td>
                        <td>INL102</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c033" type="checkbox" onclick='checkBoxStrike("c033")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Innovation-and-Leadership-201-INL201.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 202</td>
                        <td>INL202</td>
                        <td>6</td>
                        <td>5</td>
                        <td>INL102</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c034" type="checkbox" onclick='checkBoxStrike("c034")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Innovation-and-Leadership-202-INL202.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Linear Programming 281</td>
                        <td>LPR281</td>
                        <td>6</td>
                        <td>11</td>
                        <td>LPR181, MAT181</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c035" type="checkbox" onclick='checkBoxStrike("c035")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Linear-Programming-281-LPR281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Mathematics 281</td>
                        <td>MAT281</td>
                        <td>6</td>
                        <td>11</td>
                        <td>MAT181</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c036" type="checkbox" onclick='checkBoxStrike("c036")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Mathematics-281-MAT281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 281</td>
                        <td>PRG281</td>
                        <td>6</td>
                        <td>13</td>
                        <td>PRG182</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c037" type="checkbox" onclick='checkBoxStrike("c037")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Programming-281-PRG281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 282</td>
                        <td>PRG282</td>
                        <td>6</td>
                        <td>8</td>
                        <td>DBD281, PRG281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c038" type="checkbox" onclick='checkBoxStrike("c038")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Programming-282-PRG282.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Project Management 281</td>
                        <td>PMM281</td>
                        <td>6</td>
                        <td>7</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c039" type="checkbox" onclick='checkBoxStrike("c039")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Project-Management-281-PMM281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Statistics 281</td>
                        <td>STA281</td>
                        <td>6</td>
                        <td>4</td>
                        <td>STA181</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c040" type="checkbox" onclick='checkBoxStrike("c040")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Statistics-281-STA281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Web Programming 281</td>
                        <td>WPR281</td>
                        <td>6</td>
                        <td>12</td>
                        <td>PRG181, WPR181</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c041" type="checkbox" onclick='checkBoxStrike("c041")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Web-Programming-281-WPR281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Fundamentals: Software Engineering Stream</th>
                      <tr>
                        <td>Software Analysis & Design 281</td>
                        <td>SAD281</td>
                        <td>7</td>
                        <td>9</td>
                        <td>PMM281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c042" type="checkbox" onclick='checkBoxStrike("c042")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Software-Analysis-and-Design-281-SAD281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      
                      <th colspan = 7>Fundamentals: Data Science Stream</th>
                      <tr>
                        <td>Data Warehousing 281</td>
                        <td>DWH281</td>
                        <td>7</td>
                        <td>9</td>
                        <td>DBD281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c043" type="checkbox" onclick='checkBoxStrike("c043")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Data-Warehousing-281-DWH281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>

                      <th colspan = 7>Electives (Choose one of)</th>
                      <tr>
                        <td>Internet Of Things 281</td>
                        <td>IOT281</td>
                        <td>6</td>
                        <td>8</td>
                        <td>PRG181, WPR281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c044" type="checkbox" onclick='checkBoxStrike("c044")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Internet-of-Things-281-IOT281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Software Testing 281</td>
                        <td>SWT281</td>
                        <td>6</td>
                        <td>8</td>
                        <td>PRG282</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c045" type="checkbox" onclick='checkBoxStrike("c045")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/2nd Year/Software-Testing-281-SWT281.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>
                      
                      <br>

                      <h4>Third Academic Year</h4>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <th colspan = 7>Core</th>
                      <tr>
                        <td>Research Methods 381</td>
                        <td>RSH381</td>
                        <td>7</td>
                        <td>7</td>
                        <td>STA281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c046" type="checkbox" onclick='checkBoxStrike("c046")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Research-Methods-381-RSH381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Database Development 381</td>
                        <td>DBD381</td>
                        <td>7</td>
                        <td>7</td>
                        <td>DBD281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c047" type="checkbox" onclick='checkBoxStrike("c047")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Database-Development-381-DBD381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 381</td>
                        <td>INL381</td>
                        <td>7</td>
                        <td>5</td>
                        <td>INL201, INL202</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c048" type="checkbox onclick='checkBoxStrike("c048")'">
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Innovation-and-Leadership-381-INL381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Linear Programming 381</td>
                        <td>LPR381</td>
                        <td>7</td>
                        <td>11</td>
                        <td>LPR281, MAT281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c049" type="checkbox" onclick='checkBoxStrike("c049")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Linear-Programming-381-LPR381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Machine Learning 381</td>
                        <td>MLG381</td>
                        <td>7</td>
                        <td>7</td>
                        <td>STA281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c050" type="checkbox" onclick='checkBoxStrike("c050")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Machine-Learning-381-MLG381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Project 381</td>
                        <td>PRJ381</td>
                        <td>8</td>
                        <td>17</td>
                        <td>PMM281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c051" type="checkbox" onclick='checkBoxStrike("c051")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Project-381-PRJ381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Project Management 381</td>
                        <td>PMM381</td>
                        <td>7</td>
                        <td>7</td>
                        <td>PRG182</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c052" type="checkbox" onclick='checkBoxStrike("c052")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Project-Management-381-PMM381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Fundamentals: Software Engineering Stream</th>
                      <tr>
                        <td>Programming 381</td>
                        <td>PRG381</td>
                        <td>7</td>
                        <td>9</td>
                        <td>PRG282</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c053" type="checkbox" onclick='checkBoxStrike("c053")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Programming-381-PRG381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Software Engineering 381</td>
                        <td>SEN381</td>
                        <td>8</td>
                        <td>30</td>
                        <td>PMM381, PRG282, SAD281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c054" type="checkbox" onclick='checkBoxStrike("c054")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Software-Engineering-381-SEN381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Web Programming 381</td>
                        <td>WPR381</td>
                        <td>7</td>
                        <td>9</td>
                        <td>PRG282, WPR281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c055" type="checkbox" onclick='checkBoxStrike("c055")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Web-Programming-381-WPR381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Fundamentals: Data Science Stream</th>
                      <tr>
                        <td>Data Science 381</td>
                        <td>BIN381</td>
                        <td>8</td>
                        <td>30</td>
                        <td>DWH281, MLG381</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c056" type="checkbox" onclick='checkBoxStrike("c056")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Data-Science-381-DTS381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Database Administration 381</td>
                        <td>DBA381</td>
                        <td>7</td>
                        <td>9</td>
                        <td>DBD281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c057" type="checkbox" onclick='checkBoxStrike("c057")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Database-Administration-381-DBA381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Statistics 381</td>
                        <td>STA381</td>
                        <td>7</td>
                        <td>9</td>
                        <td>STA281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c058" type="checkbox" onclick='checkBoxStrike("c058")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Statistics-381-STA381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>

                      <th colspan = 7>Electives (Choose one of)</th>
                      <tr>
                        <td>Innovation Management 381</td>
                        <td>INM381</td>
                        <td>7</td>
                        <td>11</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c059" type="checkbox" onclick='checkBoxStrike("c059")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Innovation-Management-381-INM381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Machine Learning 382</td>
                        <td>MLG382</td>
                        <td>7</td>
                        <td>11</td>
                        <td>MLG381, PRG282</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c060" type="checkbox" onclick='checkBoxStrike("c060")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/Machine-Learning-382-MLG382.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>User Experience Design 381</td>
                        <td>UAX381</td>
                        <td>7</td>
                        <td>11</td>
                        <td>PRG282, WPR281</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c061" type="checkbox" onclick='checkBoxStrike("c061")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/3rd Year/User-Experience-Design-381-UXD381.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>

                       <br>

                      <h3>Fourth Experiential Learning Year</h3>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <tr>
                        <td>Applied Information Technology 481</td>
                        <td>AIT481</td>
                        <td>7</td>
                        <td>60</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c062" type="checkbox" onclick='checkBoxStrike("c062")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/4th Year/Applied-Information-Technology-481-AIT481.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Applied Information Technology 482</td>
                        <td>AIT482</td>
                        <td>8</td>
                        <td>60</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c063" type="checkbox" onclick='checkBoxStrike("c063")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/4th Year/Applied-Information-Technology-482-AIT482.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Dissertation 481</td>
                        <td>DST481</td>
                        <td>8</td>
                        <td>30</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c064" type="checkbox" onclick='checkBoxStrike("c064")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/4th Year/Dissertation-481-DST481.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>
                      </div>
                    </div>
                    <div>
                        <iframe class="youtube" src="https://www.youtube.com/embed/5DseUk4Jvw4?si=l78fFcReG-_KPHVi"></iframe>
                    </div>
                    </section>`;
                    
                  }else if (link.classList.contains('bit')) {
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');
                    coursedetails.innerHTML = `
                    <section id='content'>
                    <div class="head">
                      <h1>Bachelor of Information Technology</h1>
                        <button class="test3" id="print">Print Course</button>
                      <button class="test2">Go back to main</button>
                    </div>
                    <div class="body">
                      <div class="info">
                      <p>A bachelor’s degree remains the entry standard in many professional careers. Its long-term benefits make it well worth the initial investment as it allows you professional entry into some of the top names in IT. It will also give you the knowledge and skills to create your own enterprise within the sector. Overall, an IT degree is a worthwhile investment in your future.</p>
                        <h1>Overview</h1>
                        <p>This IT degree focuses on information systems modules and will provide you with foundational knowledge in software engineering and business intelligence. You will cover an extensive range of topics, from mobile and wireless networks to artificial intelligence and intelligent systems.</p>
                        <p>By placing a strong focus on knowledge, execution, and professional skills, this IT degree will transform you into a complete professional with a range of interesting opportunities to explore, including the development of mobile and web-based apps and even game development.</p>
                       </div>
                      <div class="coursemodules">
                      <h1>Modules</h1>
                      <br>
                      <h2>First Academic Year</h2>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <th colspan = 7>Core</th>
                      <tr>
                        <td>Academic Writing 171</td>
                        <td>ACW171</td>
                        <td>5</td>
                        <td>4</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c065" type="checkbox" onclick='checkBoxStrike("c065")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Academic-Writing-171-ACW171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Computer Architecture 171</td>
                        <td>COA171</td>
                        <td>5</td>
                        <td>7</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c066" type="checkbox" onclick='checkBoxStrike("c066")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Computer-Architecture-171-COA171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Database Development 171</td>
                        <td>DBD181</td>
                        <td>5</td>
                        <td>12</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c067" type="checkbox" onclick='checkBoxStrike("c067")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Database-Development-171-DBD171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>English Communication 171</td>
                        <td>ENG171</td>
                        <td>5</td>
                        <td>7</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c068" type="checkbox" onclick='checkBoxStrike("c068")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/English-Communication-171-ENG171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Information Systems 171</td>
                        <td>INF171</td>
                        <td>5</td>
                        <td>12</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c067" type="checkbox" onclick='checkBoxStrike("c067")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Information-Systems-171-INF171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 101</td>
                        <td>INL101</td>
                        <td>5</td>
                        <td>5</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c068" type="checkbox" onclick='checkBoxStrike("c068")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Innovation-and-Leadership-101-INL101-1.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 102</td>
                        <td>INL102</td>
                        <td>5</td>
                        <td>5</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c069" type="checkbox" onclick='checkBoxStrike("c069")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Innovation-and-Leadership-102-INL102.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Mathematics 171</td>
                        <td>MAT171</td>
                        <td>5</td>
                        <td>11</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13"> 
                          <input id="c070" type="checkbox" onclick='checkBoxStrike("c070")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Mathematics-171-MAT171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Networking Development 171</td>
                        <td>NWD171</td>
                        <td>5</td>
                        <td>8</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c071" type="checkbox" onclick='checkBoxStrike("c071")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Network-Development-171-NWD171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 171</td>
                        <td>PRG171</td>
                        <td>5</td>
                        <td>16</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c071" type="checkbox" onclick='checkBoxStrike("c071")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Programming-171-PRG171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 172</td>
                        <td>PRG172</td>
                        <td>5</td>
                        <td>9</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c072" type="checkbox" onclick='checkBoxStrike("c072")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Programming-172-PRG172.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Statistics 171</td>
                        <td>STA171</td>
                        <td>5</td>
                        <td>4</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c073" type="checkbox" onclick='checkBoxStrike("c073")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Statistics-171-STA171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Web Programming 171</td>
                        <td>WPR171</td>
                        <td>5</td>
                        <td>13</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c074" type="checkbox" onclick='checkBoxStrike("c074")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Web-Programming-171-WPR171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Electives (Choose one of)</th>
                      <tr>
                        <td>Business Management 171</td>
                        <td>BUM171</td>
                        <td>5</td>
                        <td>7</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c075" type="checkbox" onclick='checkBoxStrike("c075")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/1st Year/Business-Management-171-BUM171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Entrepreneurship 171</td>
                        <td>ENT171</td>
                        <td>5</td>
                        <td>7</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c076" type="checkbox" onclick='checkBoxStrike("c076")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="index.html" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>

                      <br>

                      <h3>Second Academic Year</h3>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <th colspan = 7>Core</th>
                      <tr>
                        <td>Cloud-Native Application Architecture 271</td>
                        <td>CNA271</td>
                        <td>6</td>
                        <td>11</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c077" type="checkbox" onclick='checkBoxStrike("c077")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Cloud-Native-Application-Architecture-271-CNA271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Database Development 271</td>
                        <td>DBD271</td>
                        <td>6</td>
                        <td>15</td>
                        <td>DBD171</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c078" type="checkbox" onclick='checkBoxStrike("c078")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Database-Development-271-DBD271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Enterprise Systems 271</td>
                        <td>ERP271</td>
                        <td>6</td>
                        <td>7</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c079" type="checkbox" onclick='checkBoxStrike("c079")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Enterprise-Systems-271-ERP271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Ethics 271</td>
                        <td>ETH271</td>
                        <td>6</td>
                        <td>4</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c080" type="checkbox" onclick='checkBoxStrike("c080")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Ethics-271-ETH271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Information Systems 271</td>
                        <td>INF271</td>
                        <td>6</td>
                        <td>12</td>
                        <td>INF171</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c081" type="checkbox" onclick='checkBoxStrike("c081")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Information-Systems-271-INF271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 201</td>
                        <td>INL201</td>
                        <td>6</td>
                        <td>5</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c082" type="checkbox" onclick='checkBoxStrike("c082")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Innovation-and-Leadership-201-INL201.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 202</td>
                        <td>INL202</td>
                        <td>6</td>
                        <td>5</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c083" type="checkbox" onclick='checkBoxStrike("c083")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Innovation-and-Leadership-202-INL202.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Linear Programming 171</td>
                        <td>LPR171</td>
                        <td>6</td>
                        <td>11</td>
                        <td>MAT171</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c083" type="checkbox" onclick='checkBoxStrike("c083")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Linear-Programming-171-LPR171.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 271</td>
                        <td>PRG271</td>
                        <td>6</td>
                        <td>13</td>
                        <td>PRG172</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c084" type="checkbox" onclick='checkBoxStrike("c084")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Programming-271-PRG271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 272</td>
                        <td>PRG272</td>
                        <td>6</td>
                        <td>8</td>
                        <td>DBD271, PRG271</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c085" type="checkbox" onclick='checkBoxStrike("c085")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Programming-272-PRG272.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Project Management 271</td>
                        <td>PMM271</td>
                        <td>6</td>
                        <td>7</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c086" type="checkbox" onclick='checkBoxStrike("c086")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Project-Management-271-PMM271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Statistics 271</td>
                        <td>STA271</td>
                        <td>6</td>
                        <td>4</td>
                        <td>STA171</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c087" type="checkbox" onclick='checkBoxStrike("c087")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Software-Testing-271-SWT271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Web Programming 271</td>
                        <td>WPR271</td>
                        <td>6</td>
                        <td>10</td>
                        <td>PRG171, WPR171</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c088" type="checkbox" onclick='checkBoxStrike("c088")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Web-Programming-271-WPR271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Electives (Choose one of)</th>
                      <tr>
                        <td>Internet Of Things 271</td>
                        <td>IOT271</td>
                        <td>6</td>
                        <td>8</td>
                        <td>PRG171, WPR271</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c089" type="checkbox" onclick='checkBoxStrike("c089")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Internet-of-Things-271-IOT271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Software Testing 271</td>
                        <td>SWT271</td>
                        <td>6</td>
                        <td>8</td>
                        <td>PRG272</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c090" type="checkbox" onclick='checkBoxStrike("c090")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/2nd Year/Software-Testing-271-SWT271.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>
                      
                      <br>

                      <h4>Third Academic Year</h4>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <th colspan = 7>Core</th>
                      <tr>
                        <td>Business Intelligence 371</td>
                        <td>BIN371</td>
                        <td>7</td>
                        <td>10</td>
                        <td>SQL</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c091" type="checkbox" onclick='checkBoxStrike("c091")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Business-Intelligence-371-BIN371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                      <tr>
                        <td>Cloud-Native Application Programming 371</td>
                        <td>CNA371</td>
                        <td>7</td>
                        <td>11</td>
                        <td>CNA271</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c092" type="checkbox" onclick='checkBoxStrike("c092")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Cloud-Native-Application-Programming-371-CNA371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Data Analytics 371</td>
                        <td>DAL371</td>
                        <td>7</td>
                        <td>14</td>
                        <td>STA271</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c093" type="checkbox" onclick='checkBoxStrike("c093")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Data-Analytics-371-DAL371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                      <tr>
                        <td>Database Development 371</td>
                        <td>DBD371</td>
                        <td>7</td>
                        <td>7</td>
                        <td>DBD271</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c094" type="checkbox" onclick='checkBoxStrike("c094")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Database-Development-371-DBD371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 371</td>
                        <td>INL371</td>
                        <td>7</td>
                        <td>5</td>
                        <td>INL201, INL202</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c095" type="checkbox" onclick='checkBoxStrike("c095")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Innovation-and-Leadership-371-INL371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 371</td>
                        <td>PRG371</td>
                        <td>7</td>
                        <td>9</td>
                        <td>PRG272</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c096" type="checkbox" onclick='checkBoxStrike("c096")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Programming-371-PRG371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Project 371</td>
                        <td>PRJ371</td>
                        <td>7</td>
                        <td>17</td>
                        <td>PMM271</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c097" type="checkbox" onclick='checkBoxStrike("c097")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Project-371-PRJ371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Project Management 371</td>
                        <td>PMM371</td>
                        <td>7</td>
                        <td>7</td>
                        <td>PMM271</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c098" type="checkbox" onclick='checkBoxStrike("c098")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Project-Management-371-PMM371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Fundamentals: Software Engineering Stream</th>
                      <tr>
                        <td>Software Analysis & Design 371</td>
                        <td>SAD371</td>
                        <td>7</td>
                        <td>14</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c099" type="checkbox" onclick='checkBoxStrike("c099")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Software-Analysis-and-Design-371-SAD371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Software Engineering 371</td>
                        <td>SEN371</td>
                        <td>7</td>
                        <td>16</td>
                        <td>PMM371, PRG272, SAD371</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c100" type="checkbox" onclick='checkBoxStrike("c100")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Software-Engineering-371-SEN371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Web Programming 371</td>
                        <td>WPR371</td>
                        <td>7</td>
                        <td>9</td>
                        <td>PRG272, WPR271</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c101" type="checkbox" onclick='checkBoxStrike("c101")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Web-Programming-371-WPR371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation Management 371</td>
                        <td>INM371</td>
                        <td>7</td>
                        <td>11</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c102" type="checkbox" onclick='checkBoxStrike("c102")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/Innovation-Management-371-INM371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>User Experience Design 371</td>
                        <td>UAX371</td>
                        <td>7</td>
                        <td>11</td>
                        <td>PRG272, WPR271</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c103" type="checkbox" onclick='checkBoxStrike("c103")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/User-Experience-Design-371-UXD371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>
                      </div>
                    </div>
                    <div>
                        <iframe class="youtube" src="https://www.youtube.com/embed/5DseUk4Jvw4?si=l78fFcReG-_KPHVi"></iframe>
                    </div>
                    </section>
                    `;

                  }else if (link.classList.contains('dit')) {
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');
                    coursedetails.innerHTML = `
                    <section id='content'>
                    <div class="head">
                      <h1>Diploma in Information Technology</h1>
                      <button class="test3" id="print">Print Course</button>
                      <button class="test2">Go back to main</button>
                    </div>
                    <div class="body">
                      <div class="info">
                      <p>This empowering diploma features on-trend specialisations aligned with real-world industry requirements. These specialisations will give you access to many exciting career opportunities and allow you to graduate in high demand.</p>
                        <h1>Overview</h1>
                        <p>Our Diploma in Information Technology consists of a generic foundation phase and a specialisation phase. The foundation phase gives insight into the field of information technology, while the specialisation phase is career oriented.  This academic programme will transform you into a well-rounded professional through a strong focus on knowledge, execution, and professional and practical skills. You will also have the incredible opportunity to complete 6 months of in-service training at an external company or in a simulated work environment.</p>
                       </div>
                      <div class="coursemodules">
                      <h1>Modules</h1>
                      <br>
                      <h2>First Academic Year</h2>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <th colspan = 7>Core</th>
                      <tr>
                        <td>Business Communication 161</td>
                        <td>BUC161</td>
                        <td>5</td>
                        <td>4</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c104" type="checkbox" onclick='checkBoxStrike("c104")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Business-Communication-161-BUC161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Business Management and Entrepreneurship 161</td>
                        <td>BME161</td>
                        <td>5</td>
                        <td>8</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c105" type="checkbox" onclick='checkBoxStrike("c105")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Business-Management-and-Entrepreneurship-161-BME161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Computer Architecture 161</td>
                        <td>COA161</td>
                        <td>5</td>
                        <td>8</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c106" type="checkbox" onclick='checkBoxStrike("c106")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Computer-Architecture-161-COA161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Database Concept 161</td>
                        <td>DBC161</td>
                        <td>5</td>
                        <td>8</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c107" type="checkbox" onclick='checkBoxStrike("c107")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Database-Concept-161-DBC161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Database Functionality 161</td>
                        <td>DBF161</td>
                        <td>5</td>
                        <td>8</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c108" type="checkbox" onclick='checkBoxStrike("c108")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Database-Functionality-161-DBF161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>End User Computing 161</td>
                        <td>EUC161</td>
                        <td>5</td>
                        <td>4</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c109" type="checkbox" onclick='checkBoxStrike("c109")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/End-User-Computing-161-EUC161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 161</td>
                        <td>INL161</td>
                        <td>5</td>
                        <td>10</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c110" type="checkbox" onclick='checkBoxStrike("c110")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Innovation-and-Leadership-161-INL161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Internet of Things 161</td>
                        <td>IOT161</td>
                        <td>5</td>
                        <td>8</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c111" type="checkbox" onclick='checkBoxStrike("c111")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Internet-of-Things-161-IOT161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Mathematics 161</td>
                        <td>MAT161</td>
                        <td>5</td>
                        <td>10</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c112" type="checkbox" onclick='checkBoxStrike("c112")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Mathematics-161-MAT161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Network Development 161</td>
                        <td>NWD161</td>
                        <td>5</td>
                        <td>8</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c113" type="checkbox" onclick='checkBoxStrike("c113")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Network-Development-161-NWD161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Problem Solving 161</td>
                        <td>PRS161</td>
                        <td>5</td>
                        <td>8</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c114" type="checkbox" onclick='checkBoxStrike("c114")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Problem-Solving-161-PRS161.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 161</td>
                        <td>PRG161</td>
                        <td>5</td>
                        <td>12</td>
                        <td>PRP161, MAT161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c115" type="checkbox" onclick='checkBoxStrike("c115")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Programming-161-PRG161-1.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming Principles 161</td>
                        <td>PRG161</td>
                        <td>5</td>
                        <td>8</td>
                        <td>PRS161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c116" type="checkbox" onclick='checkBoxStrike("c116")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Programming-Principles-161-PRP161-1.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Web Programming 161</td>
                        <td>WPR161</td>
                        <td>5</td>
                        <td>12</td>
                        <td>EUC161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c117" type="checkbox" onclick='checkBoxStrike("c117")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Web-Programming-161-WPR161-1.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Statistics 161</td>
                        <td>STA161</td>
                        <td>5</td>
                        <td>4</td>
                        <td>EUC161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c118" type="checkbox" onclick='checkBoxStrike("c118")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/1st Year/Statistics-161-STA161-1.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>

                      <br>

                      <h3>Second Academic Year</h3>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <th colspan = 7>Core</th>
                      <tr>
                        <td>Database Development 261</td>
                        <td>DBD261</td>
                        <td>6</td>
                        <td>7</td>
                        <td>DBF161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c119" type="checkbox" onclick='checkBoxStrike("c119")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Database-Development-261-DBD261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Enterprise Systems 261</td>
                        <td>ERP261</td>
                        <td>6</td>
                        <td>4</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c120" type="checkbox" onclick='checkBoxStrike("c120")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Enterprise-Systems-261-ERP261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Innovation and Leadership 261</td>
                        <td>INL261</td>
                        <td>6</td>
                        <td>10</td>
                        <td>INL161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c121" type="checkbox" onclick='checkBoxStrike("c121")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Innovation-and-Leadership-261-INL261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>IT Law and Ethics 261</td>
                        <td>ILE261</td>
                        <td>6</td>
                        <td>6</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c122" type="checkbox" onclick='checkBoxStrike("c122")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/IT-Law-and-Ethics-261-ILE261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Project Management 261</td>
                        <td>PMM261</td>
                        <td>6</td>
                        <td>7</td>
                        <td>EUC161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c123" type="checkbox" onclick='checkBoxStrike("c123")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Project-Management-261-PMM261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Fundamentals: Infrastructure</th>
                      <tr>
                        <td>Cloud-Native Application Architecture 261</td>
                        <td>CNA261</td>
                        <td>6</td>
                        <td>8</td>
                        <td>IOT261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c124" type="checkbox" onclick='checkBoxStrike("c124")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Cloud-Native-Architecture-261-CNA261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Internet of Things 261</td>
                        <td>IOT261</td>
                        <td>6</td>
                        <td>8</td>
                        <td>IOT161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c125" type="checkbox" onclick='checkBoxStrike("c125")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Internet-of-Things-261-IOT261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Operating Systems 261</td>
                        <td>OPS261</td>
                        <td>6</td>
                        <td>18</td>
                        <td>SEC261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c126" type="checkbox" onclick='checkBoxStrike("c126")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Operating-Systems-261-OPS261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Operating Systems 262</td>
                        <td>OPS262</td>
                        <td>6</td>
                        <td>8</td>
                        <td>OPS261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c127" type="checkbox" onclick='checkBoxStrike("c127")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Operating-Systems-262-OPS262.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Operating Systems 263</td>
                        <td>OPS263</td>
                        <td>6</td>
                        <td>8</td>
                        <td>OPS262</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c128" type="checkbox" onclick='checkBoxStrike("c128")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Operating-Systems-263-OPS263.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Security 261</td>
                        <td>SEC261</td>
                        <td>6</td>
                        <td>8</td>
                        <td>NWD161, ILE261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c129" type="checkbox" onclick='checkBoxStrike("c129")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Security-261-SEC261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Fundamentals: Software Development</th>
                      <tr>
                        <td>Programming 261</td>
                        <td>PRG261</td>
                        <td>6</td>
                        <td>12</td>
                        <td>PRG161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c130" type="checkbox" onclick='checkBoxStrike("c130")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Programming-261-PRG261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Programming 262</td>
                        <td>PRG262</td>
                        <td>6</td>
                        <td>8</td>
                        <td>PRG261, DBD261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c131" type="checkbox" onclick='checkBoxStrike("c131")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Programming-262-PRG262.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Software Analysis and Design 261</td>
                        <td>SWA261</td>
                        <td>6</td>
                        <td>8</td>
                        <td>PRP161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c132" type="checkbox" onclick='checkBoxStrike("c132")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Software-Analysis-and-Design-261-SWA261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                        <tr>
                        <td>Software Testing 261</td>
                        <td>SWT261</td>
                        <td>6</td>
                        <td>4</td>
                        <td>PRG261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c133" type="checkbox" onclick='checkBoxStrike("c133")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Software-Testing-261-SWT261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Software Testing 262 (Elective)</td>
                        <td>SWA262</td>
                        <td>6</td>
                        <td>12</td>
                        <td>SWT261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c134" type="checkbox" onclick='checkBoxStrike("c134")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Software-Testing-262-SWT262.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                        <tr>
                        <td>User Experience Design 261 (Elective)</td>
                        <td>UXD261</td>
                        <td>6</td>
                        <td>12</td>
                        <td>PRG261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c135" type="checkbox" onclick='checkBoxStrike("c135")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/User-Experience-Design-261-UXD261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                        <tr>
                        <td>Web Programming 261</td>
                        <td>WRP261</td>
                        <td>6</td>
                        <td>12</td>
                        <td>WPR161, PRP161</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c136" type="checkbox" onclick='checkBoxStrike("c136")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/2nd Year/Web-Programming-261-WPR261.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                        
                      <th colspan = 7>Specialisations Available for Infrastructure (Choose two)</th>
                      <tr></tr>
                      <th colspan = 7>Specialisation - Cloud</th>
                      <tr>
                        <td>Cloud-Native Architecture 361</td>
                        <td>CNA361</td>
                        <td>6</td>
                        <td>40</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c137" type="checkbox" onclick='checkBoxStrike("c137")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Cloud-Native-Architecture-361-CNA361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      
                      <th colspan = 7>Specialisation - Security</th>
                      <tr>
                        <td>Ethical Hacking 361</td>
                        <td>EHA361</td>
                        <td>6</td>
                        <td>22</td>
                        <td>PET361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c138" type="checkbox" onclick='checkBoxStrike("c138")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Ethical-Hacking-361-EHA361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Penetration Testing 361</td>
                        <td>PET361</td>
                        <td>6</td>
                        <td>18</td>
                        <td>SEC261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c139" type="checkbox" onclick='checkBoxStrike("c139")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Penetration-Testing-361-PET361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>

                      <th colspan = 7>Specialisation - Networking</th>
                      <tr>
                        <td>DevOps 361 (Elective)</td>
                        <td>DOP361</td>
                        <td>6</td>
                        <td>12</td>
                        <td>NWD361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c140" type="checkbox" onclick='checkBoxStrike("c140")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/DevOps-361-DOP361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      
                      <tr>
                        <td>Mainframe 361 (Elective)</td>
                        <td>MFR361</td>
                        <td>6</td>
                        <td>12</td>
                        <td>OPS361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c141" type="checkbox" onclick='checkBoxStrike("c141")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Mainframe-361-MFR361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      
                      <tr>
                        <td>Network Development 361</td>
                        <td>NWD361</td>
                        <td>6</td>
                        <td>16</td>
                        <td>OPS262</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c142" type="checkbox" onclick='checkBoxStrike("c142")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Network-Development-361-NWD361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      
                      <tr>
                        <td>Operating Systems 361</td>
                        <td>OPS361</td>
                        <td>6</td>
                        <td>12</td>
                        <td>OPS263</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c143" type="checkbox" onclick='checkBoxStrike("c143")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Operating-Systems-361-OPS361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>Specialisation - Database</th>
                       <tr>
                        <td>Database Administration 361</td>
                        <td>DBA361</td>
                        <td>6</td>
                        <td>7</td>
                        <td>DBD361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c144" type="checkbox" onclick='checkBoxStrike("c144")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Database-Administration-361-DBA361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Database Cloud 361</td>
                        <td>DBC361</td>
                        <td>6</td>
                        <td>4</td>
                        <td>DBD361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c145" type="checkbox" onclick='checkBoxStrike("c145")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Database-Cloud-361-DBC361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Database Development 361</td>
                        <td>DBD361</td>
                        <td>6</td>
                        <td>15</td>
                        <td>DBD261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c146" type="checkbox" onclick='checkBoxStrike("c146")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Database-Development-361-DBD361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Database Reporting</td>
                        <td>DBR361</td>
                        <td>6</td>
                        <td>6</td>
                        <td>DBD361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c147" type="checkbox" onclick='checkBoxStrike("c147")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Database-Reporting-361-DBR361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Distributed Database 361</td>
                        <td>DDB361</td>
                        <td>6</td>
                        <td>7</td>
                        <td>DBD361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c148" type="checkbox" onclick='checkBoxStrike("c148")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Distributed-Database-361-DDB361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>

                      <th colspan = 7>Specialisations Available for Software Development (Choose two)</th>
                      <tr></tr>
                      
                      <th colspan = 7>Specialisation - Web Development</th>
                       <tr>
                        <td>Web Database 361</td>
                        <td>WDB361</td>
                        <td>6</td>
                        <td>8</td>
                        <td>WPR261, WFS361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c149" type="checkbox" onclick='checkBoxStrike("c149")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Web-Database-361-WDB361-1.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Web Frontend Scripting 361</td>
                        <td>WFS361</td>
                        <td>6</td>
                        <td>28</td>
                        <td>WPR261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c150" type="checkbox" onclick='checkBoxStrike("c150")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Web-Fontend-Scripting-361-WFS361-1.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Web Servers 361</td>
                        <td>WSE361</td>
                        <td>6</td>
                        <td>4</td>
                        <td>WFS361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c151" type="checkbox" onclick='checkBoxStrike("c151")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Web-Servers-361-WSE361-1.pdf" download class="btn btn--download">Download</a></td>
                      </tr>

                      <th colspan = 7>Specialisation - Programming</th>
                       <tr>
                        <td>Programming 361</td>
                        <td>PRG361</td>
                        <td>6</td>
                        <td>14</td>
                        <td>PRG262</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c152" type="checkbox" onclick='checkBoxStrike("c152")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Programming-361-PRG361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Scripting and Syntax 361</td>
                        <td>SSX361</td>
                        <td>6</td>
                        <td>18</td>
                        <td>PRG262</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c153" type="checkbox" onclick='checkBoxStrike("c153")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Scripting-and-Syntax-361-SSX361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Software Analysis and Design 361</td>
                        <td>SWA361-V.1</td>
                        <td>6</td>
                        <td>8</td>
                        <td>SWA261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c154" type="checkbox" onclick='checkBoxStrike("c154")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Software-Analysis-and-Design-361-SWA361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Project Management 361</td>
                        <td>PMM361</td>
                        <td>6</td>
                        <td>6</td>
                        <td>PMM261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c155" type="checkbox" onclick='checkBoxStrike("c155")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Project-Management-361-PMM361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>

                      <th colspan = 7>Specialisation - Database</th>
                       <tr>
                        <td>Database Administration 361</td>
                        <td>DBA361</td>
                        <td>6</td>
                        <td>7</td>
                        <td>DBD361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c156" type="checkbox" onclick='checkBoxStrike("c156")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Database-Administration-361-DBA361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Database Cloud 361</td>
                        <td>DBC361</td>
                        <td>6</td>
                        <td>4</td>
                        <td>DBD361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c156" type="checkbox" onclick='checkBoxStrike("c156")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Database-Cloud-361-DBC361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Database Development 361</td>
                        <td>DBD361</td>
                        <td>6</td>
                        <td>15</td>
                        <td>DBD261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c157" type="checkbox" onclick='checkBoxStrike("c157")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Database-Development-361-DBD361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Database Reporting 361</td>
                        <td>DBR361</td>
                        <td>6</td>
                        <td>6</td>
                        <td>DBD361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c158" type="checkbox" onclick='checkBoxStrike("c158")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Database-Reporting-361-DBR361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                       <tr>
                        <td>Distributed Database 361</td>
                        <td>DDB361</td>
                        <td>6</td>
                        <td>7</td>
                        <td>DBD361</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c159" type="checkbox" onclick='checkBoxStrike("c159")'>
                          <label for="c1-13"></label>
                        </div>
                        </td>
                        <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Distributed-Database-361-DDB361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>
                      
                      
                      <br>

                      <h4>Third Academic Year</h4>
                      <table>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>NQF</th>
                        <th>Credits</th>
                        <th>Prerequisites</th>
                        <th>Completion</th>
                        <th>Study Guide</th>
                      </tr>
                      <th colspan = 7>Core</th>
                      <tr>
                        <td>Project 361</td>
                        <td>PRJ361</td>
                        <td>6</td>
                        <td>10</td>
                        <td>PMM261, INL261</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c160" type="checkbox" onclick='checkBoxStrike("c160")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Project-361-PRJ361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Applied Information Technology 361</td>
                        <td>AIT361</td>
                        <td>6</td>
                        <td>60</td>
                        <td>Not more than 18 credits outstanding of the total academic programme.</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c161" type="checkbox" onclick='checkBoxStrike("c161")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Applied-Information-Technology-361-AIT361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <tr>
                        <td>Work-Simulation Project 361</td>
                        <td>WSP361</td>
                        <td>6</td>
                        <td>60</td>
                        <td>Not more than 18 credits outstanding of the total academic programme.</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c162" type="checkbox" onclick='checkBoxStrike("c162")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Work-Simulation-Project-361-WSP361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>In-Service Training - External Company</th>
                         <tr>
                        <td>Applied Information Technology 361</td>
                        <td>AIT361</td>
                        <td>6</td>
                        <td>60</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c163" type="checkbox" onclick='checkBoxStrike("c163")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Applied-Information-Technology-361-AIT361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      <th colspan = 7>In-Service Training - Simulated Work Environment</th>
                      <tr>
                        <td>Work-Simulation Project 361</td>
                        <td>WSP361</td>
                        <td>6</td>
                        <td>60</td>
                        <td>None</td>
                        <td>
                        <div class="checkbox-wrapper-13">
                          <input id="c164" type="checkbox" onclick='checkBoxStrike("c164")'>
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Work-Simulation-Project-361-WSP361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>
                    </div>
                    <div>
                        <iframe class="youtube" src="https://www.youtube.com/embed/5DseUk4Jvw4?si=l78fFcReG-_KPHVi"></iframe>
                    </div>
                    </section>
                    `;
                  }else if (link.classList.contains('dds')) {
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');
                    coursedetails.innerHTML = `
                    <section id = 'content'>
                        <div class="head">
                          <h1>Diploma for Deaf Students</h1>
                          <button class="test3" id="print">Print Course</button>
                          <button class="test2">Go back to main</button>
                        </div>
                        <div class="body">
                          <div class="info">
                            <p>Our Diploma in Information Technology is spread over 4 years for our Deaf students and allows them to specialise in the in-demand and growing field of software development.</p>
                            <h1>Overview</h1>
                            <p>We have made this course accessible to our Deaf students by:</p>
                            <ul></ul>
                            <li>Providing a customised curriculum for students who use South African Sign Language (SASL) as their preferred method of communication.</li>
                            <li>Providing SASL interpreters throughout the course, including during the 6 months of workplace training.</li>
                            <li> Adopting a half-moon seating arrangement which is optimal for students learning through sign language.</li>
                            <p>This Diploma in Information Technology has the following specialisations:</p>
                            <ul></ul>
                            <li>Software Development</li>
                            <p>Our Deaf and hard-of-hearing students have the invaluable experience of working with hearing peers throughout their studies. This experience, combined with the workplace training they complete, allows them to enter the working environment with confidence.</p>
                            <h1>Additioal Information</h1>
                            <ul></ul>
                            <li>A National Senior Certificate endorsed for a Diploma.</li>
                            <li>50% or more for the Belgium Campus Aptitude Test.</li>
                            <li>An audiogram no older than 6 months.</li>
                            <li>A South African ID.</li>
                            <h1>Study Further</h1>
                            <p>We firmly believe that every student deserves access to quality higher education. We are constantly searching for new ways to improve our educational offering for our Deaf community.</p>
                            <p>Noticing how well our Deaf students performed with the Diploma in Information Technology, we have started accepting Deaf students to study for our Bachelor of Information Technology degree.</p>
                           </div>
                          <div class="coursemodules">
                          <h1>Modules</h1>
                          <br>
                          <h2>First Year</h2>
                          <table>
                          <tr>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>NQF</th>
                            <th>Credits</th>
                            <th>Prerequisites</th>
                            <th>Completion</th>
                            <th>Study Guide</th>
                          </tr>
                          <th colspan = 7>Core</th>
                          <tr>
                            <td>Marhematics 151</td>
                            <td>MAT151</td>
                            <td>5</td>
                            <td>12</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c165" type="checkbox" onclick='checkBoxStrike("c165")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Mathematics-151-MAT151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Computer Architecture 151</td>
                            <td>COA151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c166" type="checkbox" onclick='checkBoxStrike("c166")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Computer-Architecture-151-COA151.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                          <tr>
                            <td>Database Development 151</td>
                            <td>DBD151</td>
                            <td>5</td>
                            <td>18</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c167" type="checkbox" onclick='checkBoxStrike("c167")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Database-Development-151-DBD151.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                          <tr>
                            <td>End User Computing 151</td>
                            <td>EUC151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c168" type="checkbox" onclick='checkBoxStrike("c168")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/End-User-Computing-151-EUC151.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                         <tr>
                            <td>English Communication 151</td>
                            <td>ENG151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c169" type="checkbox" onclick='checkBoxStrike("c169")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/English-Communication-151-ENG151.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                           <tr>
                            <td>Information Systems 151</td>
                            <td>INF151</td>
                            <td>5</td>
                            <td>12</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c170" type="checkbox" onclick='checkBoxStrike("c170")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Information-Systems-151-INF151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                           <tr>
                            <td>Innovation and Leadership 101</td>
                            <td>INL101</td>
                            <td>5</td>
                            <td>5</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c171" type="checkbox" onclick='checkBoxStrike("c171")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Innovation-and-Leadership-101-INL101.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Innovation and Leadership 102</td>
                            <td>INL102</td>
                            <td>5</td>
                            <td>5</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c172" type="checkbox" onclick='checkBoxStrike("c172")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Innovation-and-Leadership-102-INL102.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Network Development 151</td>
                            <td>NWD151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c173" type="checkbox" onclick='checkBoxStrike("c173")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Network-Development-151-NWD151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Programming 151</td>
                            <td>PRG151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c174" type="checkbox" onclick='checkBoxStrike("c174")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Programming-151-PRG151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Programming 152</td>
                            <td>PRG152</td>
                            <td>5</td>
                            <td>13</td>
                            <td>PRG151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c175" type="checkbox" onclick='checkBoxStrike("c175")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Programming-152-PRG152.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Web Programming 151</td>
                            <td>WPR151</td>
                            <td>5</td>
                            <td>13</td>
                            <td>PRG151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c176" type="checkbox" onclick='checkBoxStrike("c176")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Web-Programming-151-WPR151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <th colspan = 7> Electives (Choose one of)</th>
                          <tr>
                            <td>Business Management 151</td>
                            <td>BUM151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c177" type="checkbox" onclick='checkBoxStrike("c177")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Business-Management-151-BUM151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Entrepreneurship 151</td>
                            <td>ENT151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c178" type="checkbox" onclick='checkBoxStrike("c178")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/1st and 2nd Year students/Entrepreneurship-151-ENT151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          </table>

                           
                          <br>

                          <h4>Third Academic Year</h4>
                          <table>
                          <th colspan = 7>Core</th>
                          <tr>
                            <td>Information Systems 251</td>
                            <td>INF251</td>
                            <td>6</td>
                            <td>12</td>
                            <td>INF151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c179" type="checkbox" onclick='checkBoxStrike("c179")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Information-Systems-251-INF251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Innovation and Leadership 201</td>
                            <td>INL201</td>
                            <td>6</td>
                            <td>5</td>
                            <td>INL102</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c180" type="checkbox" onclick='checkBoxStrike("c180")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Innovation-and-Leadership-201-INL201.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Operating Systems 251</td>
                            <td>OPS251</td>
                            <td>6</td>
                            <td>7</td>
                            <td>COA151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c181" type="checkbox" onclick='checkBoxStrike("c181")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Operating-Systems-251-OPS251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Project 251</td>
                            <td>PRJ251</td>
                            <td>6</td>
                            <td>10</td>
                            <td>PMM251</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c182" type="checkbox" onclick='checkBoxStrike("c182")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Project-251-PRJ251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Project Management 251</td>
                            <td>PMM251</td>
                            <td>6</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c183" type="checkbox" onclick='checkBoxStrike("c183")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Project-Management-251-PMM251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Security 251</td>
                            <td>SEC251</td>
                            <td>6</td>
                            <td>8</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c184" type="checkbox" onclick='checkBoxStrike("c184")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Security-251-SEC251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <th colspan= 7>Fundamentals: Infrastructure Stream</th>
                          <tr>
                            <td>Database Administration 251</td>
                            <td>DBA251</td>
                            <td>6</td>
                            <td>7</td>
                            <td>DBD151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c185" type="checkbox" onclick='checkBoxStrike("c185")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Database-Administration-251-DBA251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Network Development 251</td>
                            <td>NWD251</td>
                            <td>6</td>
                            <td>18</td>
                            <td>NWD151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c186" type="checkbox" onclick='checkBoxStrike("c186")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Network-Development-251-NWD251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Network Development 252</td>
                            <td>NWD252</td>
                            <td>6</td>
                            <td>12</td>
                            <td>NWD151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c187" type="checkbox" onclick='checkBoxStrike("c187")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Network-Development-252-NWD252.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Operating Systems 252</td>
                            <td>OPS252</td>
                            <td>6</td>
                            <td>12</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c188" type="checkbox" onclick='checkBoxStrike("c188")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Operating-Systems-252-OPS252.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Server Automation 251</td>
                            <td>SVA251</td>
                            <td>5</td>
                            <td>7</td>
                            <td>NWD251</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c189" type="checkbox" onclick='checkBoxStrike("c189")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Server-Automation-251-SVA251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Wireless Networking 251</td>
                            <td>WLN251</td>
                            <td>6</td>
                            <td>7</td>
                            <td>NWD151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c190" type="checkbox" onclick='checkBoxStrike("c190")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Wireless-Networking-251-WLN251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <th colspan=7>Fundamentals: Software Development Stream</th>
                          <tr>
                            <td>Database Development 251</td>
                            <td>DBD251</td>
                            <td>6</td>
                            <td>11</td>
                            <td>DBD151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c191" type="checkbox" onclick='checkBoxStrike("c191")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Database-Development-251-DBD251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Database Models 251</td>
                            <td>DBM251</td>
                            <td>6</td>
                            <td>7</td>
                            <td>DBD151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c192" type="checkbox" onclick='checkBoxStrike("c192")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Database-Models-251-DBM251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Programming 251</td>
                            <td>PRG251</td>
                            <td>6</td>
                            <td>12</td>
                            <td>PRG152</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c193" type="checkbox" onclick='checkBoxStrike("c193")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Programming-251-PRG251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Programming 252</td>
                            <td>PRG252</td>
                            <td>6</td>
                            <td>12</td>
                            <td>DBD251, PRG251</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c194" type="checkbox" onclick='checkBoxStrike("c194")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Programming-252-PRG252.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Web Programming 251</td>
                            <td>WPR251</td>
                            <td>6</td>
                            <td>10</td>
                            <td>DBM251, PRG151, WPR151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c195" type="checkbox" onclick='checkBoxStrike("c195")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Web-Programming-251-WPR251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Web Programming 252</td>
                            <td>WPR252</td>
                            <td>6</td>
                            <td>11</td>
                            <td>WPR251</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c196" type="checkbox" onclick='checkBoxStrike("c196")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Web-Programming-252-WPR252.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <th colspan = 7>Electives: (Choose one of)</th>
                          <tr>
                            <td>Enterprise Systems 251</td>
                            <td>ERP251</td>
                            <td>6</td>
                            <td>8</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c197" type="checkbox" onclick='checkBoxStrike("c197")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Enterprise-Systems-251-ERP251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Internet of Things 251</td>
                            <td>IOT251</td>
                            <td>6</td>
                            <td>8</td>
                            <td>WPR251, PRG151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c198" type="checkbox" onclick='checkBoxStrike("c198")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Third Academic Year/Internet-of-Things-251-IOT251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          </table>

                          <br>


                          <h5>Fourth Academic Year</h5>
                          <table>
                          <th colspan=7>Core</th>
                          <tr>
                            <td>Applied Information Technology 350</td>
                            <td>AIT350</td>
                            <td>6</td>
                            <td>120</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c199" type="checkbox" onclick='checkBoxStrike("c199")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Fourth Year/Applied-Information-Technology-350-AIT350.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          </table>
                          </div>
                        </div>
                        <div>
                        <iframe class="youtube" src="https://www.youtube.com/embed/5DseUk4Jvw4?si=l78fFcReG-_KPHVi"></iframe>
                        </div>
                        </section>
                        `;
                  }else if (link.classList.contains('nsd')) {
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');
                    coursedetails.innerHTML = `
                    <section id='content'>
                        <div class="head">
                          <h1>National Certificate: System Development</h1>
                          <button class="test3" id="print">Print Course</button>
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
                          <br>
                          <h2>First Academic Year</h2>
                          <table>
                          <tr>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>NQF</th>
                            <th>Credits</th>
                            <th>Prerequisites</th>
                            <th>Completion</th>
                            <th>Study Guide</th>
                          </tr>
                          <th colspan = 7>Core</th>
                          <tr>
                            <td>Marhematics 151</td>
                            <td>MAT151</td>
                            <td>5</td>
                            <td>12</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c200" type="checkbox" onclick='checkBoxStrike("c200")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Mathematics-151-MAT151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Computer Architecture 151</td>
                            <td>COA151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c201" type="checkbox" onclick='checkBoxStrike("c201")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Computer-Architecture-151-COA151.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                          <tr>
                            <td>Database Development 151</td>
                            <td>DBD151</td>
                            <td>5</td>
                            <td>18</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c202" type="checkbox" onclick='checkBoxStrike("c202")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Database-Development-151-DBD151.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                          <tr>
                            <td>End User Computing 151</td>
                            <td>EUC151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c203" type="checkbox" onclick='checkBoxStrike("c203")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/End-User-Computing-151-EUC151.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                         <tr>
                            <td>English Communication 151</td>
                            <td>ENG151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c204" type="checkbox" onclick='checkBoxStrike("c204")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/English-Communication-151-ENG151.pdf" download class="btn btn--download">Download</a></td>
                           
                          </tr>
                           <tr>
                            <td>Information Systems 151</td>
                            <td>INF151</td>
                            <td>5</td>
                            <td>12</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c205" type="checkbox" onclick='checkBoxStrike("c205")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Information-Systems-151-INF151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                           <tr>
                            <td>Innovation and Leadership 101</td>
                            <td>INL101</td>
                            <td>5</td>
                            <td>5</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c206" type="checkbox" onclick='checkBoxStrike("c206")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Innovation-and-Leadership-101-INL101.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Innovation and Leadership 102</td>
                            <td>INL102</td>
                            <td>5</td>
                            <td>5</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c207" type="checkbox" onclick='checkBoxStrike("c207")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Innovation-and-Leadership-102-INL102.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Network Development 151</td>
                            <td>NWD151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c208" type="checkbox" onclick='checkBoxStrike("c208")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Network-Development-151-NWD151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Programming 151</td>
                            <td>PRG151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c209" type="checkbox" onclick='checkBoxStrike("c209")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Programming-151-PRG151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Programming 152</td>
                            <td>PRG152</td>
                            <td>5</td>
                            <td>13</td>
                            <td>PRG151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c210" type="checkbox" onclick='checkBoxStrike("c210")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Programming-152-PRG152.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Web Programming 151</td>
                            <td>WPR151</td>
                            <td>5</td>
                            <td>13</td>
                            <td>PRG151</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c211" type="checkbox" onclick='checkBoxStrike("c211")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Web-Programming-151-WPR151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <th colspan = 7> Electives (Choose one of)</th>
                          <tr>
                            <td>Business Management 151</td>
                            <td>BUM151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c212" type="checkbox" onclick='checkBoxStrike("c212")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Business-Management-151-BUM151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          <tr>
                            <td>Entrepreneurship 151</td>
                            <td>ENT151</td>
                            <td>5</td>
                            <td>7</td>
                            <td>None</td>
                            <td>
                             <div class="checkbox-wrapper-13">
                              <input id="c213" type="checkbox" onclick='checkBoxStrike("c213")'>
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Entrepreneurship-151-ENT151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          </table>
                         
                          </div>
                        </div>
                        <div>
                        <iframe class="youtube" src="https://www.youtube.com/embed/5DseUk4Jvw4?si=l78fFcReG-_KPHVi"></iframe>
                        </div>
                        </section>
                        `;
                  }
                  else{
                    alert("404: file not found")
                  }
                  document.querySelector(".test2").addEventListener("click",()=>{
                    document.querySelector('.offscreencourse').classList.toggle('active');
                    document.querySelector('.mainoffscreen').classList.toggle('active');  
                  });
                  document.querySelector("#print").addEventListener("click", () => {
                    // Create a new window
                    const printWindow = window.open('', '', 'height=600,width=800');
                    
                    // Get the content from the #content element
                    const content = document.getElementById('content').innerHTML;
                  
                    // Write the content and styles to the new window
                    printWindow.document.open();
                    printWindow.document.write('<html><head><title>Print</title>');
                    printWindow.document.write('<style>');
                    printWindow.document.write(`
                      /* Print-specific styles */
                      @media print {
                        body {
                          font-size: 1rem;
                          margin: 0;
                          padding: 0;
                        }
                        table {
                          width: 100%;
                          border-collapse: collapse;
                        }
                        table, th, td {
                          border: 1px solid black;
                        }
                        th, td {
                          padding: 8px;
                          text-align: left;
                        }
                      }
                    `);
                    printWindow.document.write('</style>');
                    printWindow.document.write('</head><body>');
                    printWindow.document.write(content);
                    printWindow.document.write('</body></html>');
                    printWindow.document.close();
                    
                    // Ensure the content is loaded before printing
                    printWindow.onload = function() {
                      printWindow.focus();
                      printWindow.print();
                    };
                  
                    // Close the print window after printing is done
                    printWindow.onafterprint = function() {
                      printWindow.close();
                    };
                  
                    // Fallback in case onafterprint does not work
                    setTimeout(() => {
                      if (!printWindow.closed) {
                        printWindow.close();
                      }
                    }, 10000); // Adjust the timeout if needed (10 seconds)
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
  
  //MONTH SLIDER
  document.querySelector('#pre-month').onclick = () => {
    --currentMonth.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector('#next-month').onclick = () => {
    ++currentMonth.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  //MONTH SLIDER

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

// Function to get month name from month number
function getMonthName(monthNumber) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[monthNumber];
}

// Date1
document.getElementById('date1day').textContent = `${futureDates[0].Date.getDate()} ${getMonthName(futureDates[0].Date.getMonth())}`;
document.getElementById('date1meaning').textContent = `${futureDates[0].Meaning}`;

// Date2
document.getElementById('date2day').textContent = `${futureDates[1].Date.getDate()} ${getMonthName(futureDates[1].Date.getMonth())}`;
document.getElementById('date2meaning').textContent = `${futureDates[1].Meaning}`;

// Date3
document.getElementById('date3day').textContent = `${futureDates[2].Date.getDate()} ${getMonthName(futureDates[2].Date.getMonth())}`;
document.getElementById('date3meaning').textContent = `${futureDates[2].Meaning}`;


});
//EVENTS JS

//Just the strike through function
function checkBoxStrike(id) { /* This function is used when a user clicks on the checkbox next to the module it then stirkesthrough the text and changes the color to red it does this by navigating the DOMcontent through the various child and parent methods*/
  let mycheckbox = document.querySelector(`#${id}`);
  let divElement = mycheckbox.parentElement;
  let tdElement = divElement.parentElement;
  tdElement.className = "inputTD"
  let trElement = tdElement.parentElement;
  let array = Array.from(trElement.children);
  let filtered = new Array;
  let divDisplay = document.getElementById("checkboxCompleted")
  
  for (let i =0;i<array.length;i++) {
    if ((array[i].tagName=='TD') && !(array[i].className=='inputTD')) {
      filtered.push(array[i]);
    }
  }

  if (mycheckbox.checked){
    filtered.forEach(obj => {
      obj.className = "completion";
    })

    // Check if id is already referenced in the output
    let existingId = document.querySelector(`#${id}sub`);
    if (!existingId) {
      // adding the stuff to the div element
      let SubjectName = document.createElement('p');
      SubjectName.textContent= filtered[0].textContent;
      SubjectName.id = `${id}sub`;
      SubjectName.className = "chkSubject"
      let chkBox = document.createElement('input');
      chkBox.type="checkbox";
      chkBox.checked= true;
      chkBox.id=`${id}chk`;
      chkBox.className=`chkBox`;
      divDisplay.appendChild(SubjectName);
      SubjectName.appendChild(chkBox);

      // Added event listener to remove box when clicked
      chkBox.addEventListener('click', () => {
        divDisplay.removeChild(SubjectName);
      });
    }
  }
  else {
    let SubjectName = document.querySelector(`#${id}sub`);
    filtered.forEach(obj => {
      obj.className = ""
    })
    if (SubjectName) {
      divDisplay.removeChild(SubjectName);
      let chkBox = document.querySelector(`#${id}chk`); 
      divDisplay.removeChild(chkBox);
    }
  }
}


// Search Bar Start

// Get the search input element
const searchInput = document.querySelector('input[type="text"]');

// Get the main div where the text is generated
const mainDiv = document.querySelector('.main');

// Add an event listener to the search input element
searchInput.addEventListener('input', searchMainDiv);

// Function to search the main div
function searchMainDiv() {
  // Get the search query
  const searchQuery = searchInput.value.toLowerCase().trim();

  // Get all parent elements with one of the specified class names
  const parentElements = mainDiv.querySelectorAll('.nif, .bcomp, .bit, .dit, .dds, .nsd');

  // Loop through each parent element
  parentElements.forEach((parentElement) => {
    // Get all text elements in the parent element
    const textElements = parentElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td');

    // Initialize a flag to track whether any matches were found
    let matchFound = false;

    // Split the search query into individual words
    const searchWords = searchQuery.split(' ');

    // Loop through each text element
    textElements.forEach((element) => {
      // Get the text content of the element
      const textContent = element.textContent.toLowerCase();

      // Check if all search words are found in the text content
      const match = searchWords.every((word) => textContent.includes(word));

      if (match && searchQuery !== '') {
        // If all search words are found and the search bar is not empty, add a class to highlight the element and set the matchFound flag to true
        element.classList.add('search-highlight');
        matchFound = true;
      } else {
        // If not all search words are found or the search bar is empty, remove the highlight class
        element.classList.remove('search-highlight');
      }
    });

    // If no matches were found and the search bar is not empty, add the search-hide class to the parent element
    if (!matchFound && searchQuery !== '') {
      parentElement.classList.add('search-hide');
    } else {
      parentElement.classList.remove('search-hide');
    }
  });
}
// Search Bar End


CreateButtons = () => {
  const navbar = document.querySelector('.navbar_A');
  const btnLec = document.createElement("a");
  btnLec.id = "btnLec";
  btnLec.className = "navButton_A";
  btnLec.style.gridColumn = 3;
  btnLec.textContent = "View Lectures";
  const btnVen = document.createElement("a");
  btnVen.textContent = "View Venues";
  btnVen.className = "navButton_A";
  btnVen.style.gridColumn = 4;
  btnVen.id = "btnVen";

  navbar.appendChild(btnLec);
  navbar.appendChild(btnVen);

  // Add event listeners to the buttons
  // Add event listeners to the buttons
  btnLec.addEventListener("click", function() {
    // Create a new div to darken the background
    const backgroundOverlay = document.createElement("div");
    backgroundOverlay.className = "backgroundOverlay"
  
    document.body.appendChild(backgroundOverlay);
  
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    document.body.appendChild(overlay);

    const images = [
      { src: "Images/Lecturers/AnilaMundackal.png", text: "Anila Mundackal", modules: ["Information Systems 251", "Innovation and Leadership 201", "Operating Systems 251"] },
      { src: "Images/Lecturers/AlfredMazorodze.png", text: "Alfred Mazorodze", modules: ["Project 251", "Project Management 251", "Security 251"] },
      { src: "Images/Lecturers/CatharinaBoshoff.png", text: "Catharina Boshoff", modules: ["Mathematics 151", "Database Development 251", "Database Models 251"] },
      { src: "Images/Lecturers/Caviner Ruiters.png", text: "Caviner Ruiters", modules: ["Programming 251", "Programming 252", "Web Programming 251"] },
      { src: "Images/Lecturers/CharmaineTavagwisa.png", text: "Charmaine Tavagwisa", modules: ["Web Programming 252", "Enterprise Systems 251", "Internet of Things 251"] },
      { src: "Images/Lecturers/DesireSundire.png", text: "Desire Sundire", modules: ["Academic Writing 181", "Computer Architecture 181", "Database Development 181"] },
      { src: "Images/Lecturers/DinoGiovannoni.png", text: "Dino Giovannoni", modules: ["Information Systems 181", "Innovation and Leadership 101", "Innovation and Leadership 102"] },
      { src: "Images/Lecturers/EdwardVanNiekerk.png", text: "Edward Van Niekerk", modules: ["Linear Programming 181", "Mathematics 181", "Networking Development 181"] },
      { src: "Images/Lecturers/ElaineRynners.png", text: "Elaine Rynners", modules: ["Programming 181", "Programming 182", "Statistics 181"] },
      { src: "Images/Lecturers/EvangelistarsShayamano.png", text: "Evangelistars Shayamano", modules: ["Web Programming 181", "Business Management 181", "Entrepreneurship 181"] },
      { src: "Images/Lecturers/FrancoisSmit.png", text: "Francois Smit", modules: ["Database Development 281", "Information Systems 281", "Innovation and Leadership 201"] },
      { src: "Images/Lecturers/FrancoisVenter.png", text: "Francois Venter", modules: ["Innovation and Leadership 202", "Linear Programming 281", "Mathematics 281"] },
      { src: "Images/Lecturers/GalaletsangModimola.png", text: "Galaletsang Modimola", modules: ["Programming 281", "Programming 282", "Project Management 281"] },
      { src: "Images/Lecturers/GiftMudare.png", text: "Gift Mudare", modules: ["Statistics 281", "Web Programming 281", "Software Analysis & Design 281"] },
      { src: "Images/Lecturers/HeinVanNiekerk.png", text: "Hein Van Niekerk", modules: ["Data Warehousing 281", "Internet of Things 281", "Software Testing 281"] },
      { src: "Images/Lecturers/KudzayiMatekaire.png", text: "Kudzayi Matekaire", modules: ["Research Methods 381", "Database Development 381", "Innovation and Leadership 381"] },
      { src: "Images/Lecturers/LungileSaula.png", text: "Lungile Saula", modules: ["Linear Programming 381", "Machine Learning 381", "Project 381"] },
      { src: "Images/Lecturers/MasimbaZengeni.png", text: "Masimba Zengeni", modules: ["Project Management 381", "Programming 381", "Software Engineering 381"] },
      { src: "Images/Lecturers/MatildahChiruka.png", text: "Matildah Chiruka", modules: ["Web Programming 381", "Data Science 381", "Database Administration 381"] },
      { src: "Images/Lecturers/MichaelCombrinck.png", text: "Michael Combrinck", modules: ["Statistics 381", "Innovation Management 381", "Machine Learning 382"] },
      { src: "Images/Lecturers/NsukuNgoveni.png", text: "Nsuku Ngoveni", modules: ["User Experience Design 381", "Applied Information Technology 481", "Applied Information Technology 482"] },
      { src: "Images/Lecturers/PhilipvanHuyssteen.png", text: "Philip van Huyssteen", modules: ["Dissertation 481", "Academic Writing 171", "Computer Architecture 171"] },
      { src: "Images/Lecturers/RaymondHood.png", text: "Raymond Hood", modules: ["Database Development 171", "English Communication 171", "Information Systems 171"] },
      { src: "Images/Lecturers/SannieZwane.png", text: "Sannie Zwane", modules: ["Innovation and Leadership 101", "Innovation and Leadership 102", "Mathematics 171"] },
      { src: "Images/Lecturers/ShakengThamaga.png", text: "Shakeng Thamaga", modules: ["Networking Development 171", "Programming 171", "Programming 172"] },
      { src: "Images/Lecturers/StanleyMakweche.png", text: "Stanley Makweche", modules: ["Statistics 171", "Web Programming 171", "Business Management 171"] },
      { src: "Images/Lecturers/TendaiMkwaira.png", text: "Tendai Mkwaira", modules: ["Entrepreneurship 171", "Cloud-Native Application Architecture 271", "Database Development 271"] },
      { src: "Images/Lecturers/ReasonSithole.png", text: "Reason Sithole", modules: ["Enterprise Systems 271", "Ethics 271", "Information Systems 271"] },
      { src: "Images/Lecturers/SuraniLaubscher.png", text: "Surani Laubscher", modules: ["Innovation and Leadership 201", "Innovation and Leadership 202", "Linear Programming 171"] },
      { src: "Images/Lecturers/AsipheMagaudeni.png", text: "Asiphe Magaudeni", modules: ["Programming 271", "Programming 272", "Project Management 271"] },
      { src: "Images/Lecturers/DuanSteyn.png", text: "Duan Steyn", modules: ["Statistics 271", "Web Programming 271", "Internet of Things 271"] },
      { src: "Images/Lecturers/TichaonaChinyerere.png", text: "Tichaona Chinyerere", modules: ["Software Testing 271", "Cloud-Native Application Programming 371", "Data Analytics 371"] },
      { src: "Images/Lecturers/PulaMoila.png", text: "Pula Moila", modules: ["Database Development 371", "Innovation and Leadership 371", "Programming 371"] },
      { src: "Images/Lecturers/NkululekoLekokoane.png", text: "Nkululeko Lekokoane", modules: ["Project 371", "Project Management 371", "Software Analysis & Design 371"] },
      { src: "Images/Lecturers/IkraamSadek.png", text: "Ikraam Sadek", modules: ["Software Engineering 371", "Web Programming 371", "Innovation Management 371"] },
      { src: "Images/Lecturers/EddieCheteni.png", text: "Eddie Cheteni", modules: ["User Experience Design 371", "Business Communication 161", "Business Management and Entrepreneurship 161"] },
      { src: "Images/Lecturers/MelaryMagorimbo.png", text: "Melary Magorimbo", modules: ["Computer Architecture 161", "Database Concept 161", "Database Functionality 161"] },
      { src: "Images/Lecturers/SibusisoMhlabane.png", text: "Sibusiso Mhlabane", modules: ["End User Computing 161", "Innovation and Leadership 161", "Internet of Things 161"] },
      { src: "Images/Lecturers/BekithembaMpofu.png", text: "Bekithemba Mpofu", modules: ["Mathematics 161", "Network Development 161", "Problem Solving 161"] },
      { src: "Images/Lecturers/SolomonRuwende.png", text: "Solomon Ruwende", modules: ["Programming 161", "Programming Principles 161", "Web Programming 161"] },
      { src: "Images/Lecturers/NalediMsiya.png", text: "Naledi Msiya", modules: ["Statistics 161", "Database Development 261", "Enterprise Systems 261"] },
      { src: "Images/Lecturers/JuanitaBlignaut.png", text: "Juanita Blignaut", modules: ["Innovation and Leadership 261", "IT Law and Ethics 261", "Project Management 261"] },
    ];
    
    

    for (let i = 0; i < images.length; i++) {
      const imgContainer = document.createElement("div");
      imgContainer.className = "lecImgContainer"
      
      const img = document.createElement("img");
      img.src = images[i].src;
      
      const hoverContainer = document.createElement("div");
      hoverContainer.className = "hoverContainer";
      hoverContainer.style.pointerEvents = "none"; // Add this line
      
      const hoverText = document.createElement("p");
      hoverText.textContent = "Teaches modules: " + images[i].modules.join(", ");
      hoverText.style.color = "white"; // Set the text color to white
      hoverContainer.appendChild(hoverText);
      
      imgContainer.appendChild(hoverContainer);
      imgContainer.appendChild(img);
      
      const paragraph = document.createElement("p");
      paragraph.textContent = images[i].text;
      paragraph.style.marginTop = "10px";
      imgContainer.appendChild(paragraph);
      
      // Add event listeners for mouseover and mouseout
      imgContainer.addEventListener("mouseover", function() {
        hoverContainer.style.opacity = "1"; // Show the hover container when mouse is over
        img.style.transform = "scaleX(-1)"; // Flip the image when mouse is over
      });
      
      imgContainer.addEventListener("mouseout", function(event) {
        if (!event.relatedTarget || !imgContainer.contains(event.relatedTarget)) {
          hoverContainer.style.opacity = "0"; // Hide the hover container when mouse leaves
          img.style.transform = "scaleX(1)"; // Unflip the image when mouse leaves
        }
      });
      hoverContainer.style.pointerEvents = "none";
      overlay.appendChild(imgContainer);
      hoverText.textContent = "Teaches modules: " + images[i].modules.join(", ");
    }
    
    

    const backButton = document.createElement("button");
    backButton.className = "backView"
    backButton.textContent = "Back";

    document.body.appendChild(backButton);
  
    backButton.addEventListener("click", function() {
      overlay.remove();
      backgroundOverlay.remove();
      backButton.remove(); // Remove the back button itself
      document.body.style.background = ""; // Reset the background to its original state
    });
  });



   

  btnVen.addEventListener("click", function() {
    // Create a new div to darken the background
    const backgroundOverlay = document.createElement("div");
    backgroundOverlay.style.position = "fixed";
    backgroundOverlay.style.top = "0";
    backgroundOverlay.style.left = "0";
    backgroundOverlay.style.width = "100%";
    backgroundOverlay.style.height = "100%";
    backgroundOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black background
    backgroundOverlay.style.zIndex = "999"; // Make sure it's behind the overlay
    document.body.appendChild(backgroundOverlay);
  
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "10%";
    overlay.style.left = "5%"; // Changed to 5% to make the div 90% wide
    overlay.style.width = "90%"; // Changed to 90%
    overlay.style.height = "80%";
    overlay.style.backgroundColor = "white";
    overlay.style.zIndex = "1000";
    overlay.style.display = "flex";
    overlay.style.flexWrap = "wrap";
    overlay.style.justifyContent = "space-around";
    overlay.style.overflowY = "auto"; // Add this line to make the div scrollable
    document.body.appendChild(overlay);
  
    const list = document.createElement("ul");
    list.style.listStyle = "none";
    list.style.padding = "0";
    list.style.margin = "0";
    list.style.display = "grid";
    list.style.gridTemplateColumns = "repeat(4, 1fr)";
    list.style.gap = "10px";
    overlay.appendChild(list);
  
    const classrooms = [
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
      "Epsilon",
      "Zeta",
      "Eta",
      "Theta",
      "Iota",
      "Kappa",
      "Lambda",
      "Omicron",
      "Pi",
      "Rho",
      "Sigma",
      "Tau",
      "Ypsilon",
      "Phi",
      "Chi",
      "Psi",
      "Omega"
    ];
  
    classrooms.forEach((classroom) => {
      const listItem = document.createElement("li");
      listItem.textContent = classroom;
      listItem.style.textAlign = "center";
      list.appendChild(listItem);
    });
  
    const backButton = document.createElement("button");
    backButton.className = "backView"
    backButton.textContent = "Back";

    document.body.appendChild(backButton);
  
    backButton.addEventListener("click", function() {
      overlay.remove();
      backgroundOverlay.remove();
      backButton.remove(); // Remove the back button itself
      document.body.style.background = ""; // Reset the background to its original state
    });
  })};




    window.onload(CreateButtons())


    
