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
                              <input id="c003" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Higher Certificate/1st Year/Internet-of-Things-251-IOT251.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          </table>
                          </div>
                        </div>
                      </section>
                        `;
                       
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BCOM/4th Year/Dissertation-481-DST481.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>
                      </div>
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/BIT/3rd Year/User-Experience-Design-371-UXD371.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
                      </table>
                      </div>
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
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
                          <input id="c1-13" type="checkbox">
                          <label for="c1-13"></label>
                        </div>
                      </td>
                      <td><a class="buttondownload" href="Study Guide/Diploma/3rd Year/Work-Simulation-Project-361-WSP361.pdf" download class="btn btn--download">Download</a></td>
                      </tr>
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/Diploma for Deaf Students/Fourth Year/Applied-Information-Technology-350-AIT350.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          </table>
                          </div>
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
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
                              <input id="c1-13" type="checkbox">
                              <label for="c1-13"></label>
                             </div>
                            </td>
                            <td><a class="buttondownload" href="Study Guide/National Certificate IT/Entrepreneurship-151-ENT151.pdf" download class="btn btn--download">Download</a></td>
                          </tr>
                          </table>
                         
                          </div>
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
                    printWindow.document.write('<link rel="stylesheet" type="text/css" href="print.css">');
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
function checkBoxStrike(id) {
  let mycheckbox = document.querySelector(`#${id}`);
  let divElement = mycheckbox.parentElement;
  let tdElement = divElement.parentElement;
  tdElement.className = "inputTD"
  let trElement = tdElement.parentElement;
  let array = Array.from(trElement.children);
  let filtered = new Array;
  
  for (let i =0;i<array.length;i++) {
    if ((array[i].tagName=='TD') && !(array[i].className=='inputTD')) {
      filtered.push(array[i]);
    }
  }

    if (mycheckbox.checked){
      filtered.forEach(obj => {
       obj.className = "completion"
      })
    }
    else {
      filtered.forEach(obj => {
        obj.className = ""
       })
    }
}
