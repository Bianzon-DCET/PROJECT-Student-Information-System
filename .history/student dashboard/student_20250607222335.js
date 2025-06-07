/** GOAL!!!!!!!
 Student dashboard functionality
 * loads and displays student data.
 * manages modal for viewing course schedules.
 * provides logout functionality.
 * edits prodfile
 Data is retrieved from localStorage.
 */
document.addEventListener("DOMContentLoaded", function () {
  loadStudentData();

  // Modal
  const openBtn = document.getElementById("openScheduleModal");
  const modal = document.getElementById("scheduleModal");
  const closeBtn = document.getElementById("closeScheduleModal");
  const modalTable = document.getElementById("modalScheduleTable");

  if (openBtn && modal && closeBtn && modalTable) {
    openBtn.onclick = function () {
      // Fill the schedule
      modalTable.innerHTML = `
        <tr>
          <th>Day</th>
          <th>Time</th>
          <th>Subject</th>
        </tr>
      `;
      var students = JSON.parse(localStorage.getItem("students")) || [];
      var loggedInStudentID = localStorage.getItem("loggedInStudentID");
      var loggedInStudent = students.find(
        (student) => student.id === loggedInStudentID
      );
      var schedules = {
        BSIT: [
          { day: "Mon", time: "8-10am", subject: "Programming" },
          { day: "Wed", time: "10-12pm", subject: "Networking" },
        ],
        BSCS: [
          { day: "Tue", time: "9-11am", subject: "Algorithms" },
          { day: "Thu", time: "1-3pm", subject: "Data Science" },
        ],
        BSEd: [
          { day: "Mon", time: "1-3pm", subject: "Education Theory" },
          { day: "Fri", time: "8-10am", subject: "Practice Teaching" },
        ],
        BSBA: [
          { day: "Tue", time: "8-10am", subject: "Accounting" },
          { day: "Thu", time: "10-12pm", subject: "Marketing" },
        ],
        BSA: [
          { day: "Mon", time: "10-12pm", subject: "Auditing" },
          { day: "Wed", time: "1-3pm", subject: "Taxation" },
        ],
        BSCE: [
          { day: "Tue", time: "1-3pm", subject: "Statics" },
          { day: "Fri", time: "10-12pm", subject: "Surveying" },
        ],
      };
      var courseSched = schedules[loggedInStudent.course] || [];
      if (courseSched.length === 0) {
        modalTable.innerHTML += `<tr><td colspan="3">No schedule available.</td></tr>`;
      } else {
        courseSched.forEach((item) => {
          modalTable.innerHTML += `<tr>
            <td>${item.day}</td>
            <td>${item.time}</td>
            <td>${item.subject}</td>
          </tr>`;
        });
      }
      modal.style.display = "block";
    };
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) modal.style.display = "none";
    };
  }
});

function loadStudentData() {
  var studentName = document.getElementById("studentName");
  var studentID = document.getElementById("studentID");
  var studentCourse = document.getElementById("studentCourse");
  var gradeTable = document.getElementById("gradeTable");
  var studentEmail = document.getElementById("studentEmail");
  var studentContact = document.getElementById("studentContact");
  var attendanceList = document.getElementById("attendanceList");
  var billingStatus = document.getElementById("billingStatus");
  var scheduleList = document.getElementById("scheduleList");

  var students = JSON.parse(localStorage.getItem("students")) || [];
  var loggedInStudentID = localStorage.getItem("loggedInStudentID");

  var loggedInStudent = students.find(
    (student) => student.id === loggedInStudentID
  );

  if (loggedInStudent) {
    studentName.innerText = loggedInStudent.name;
    studentID.innerText = loggedInStudent.id;
    studentCourse.innerText = loggedInStudent.course;
    studentEmail.innerText = loggedInStudent.email || "N/A";
    studentContact.innerText = loggedInStudent.contact || "N/A";
    billingStatus.innerText = loggedInStudent.billing || "Unpaid";

    // Grades
    gradeTable.innerHTML = `
      <tr>
        <th>Course</th>
        <th>Grade</th>
      </tr>
      <tr>
        <td>${loggedInStudent.course}</td>
        <td>${loggedInStudent.grade || "Pending"}</td>
      </tr>
    `;

    // Attendance
    attendanceList.innerHTML = "";
    if (loggedInStudent.attendance && loggedInStudent.attendance.length > 0) {
      loggedInStudent.attendance.forEach((date) => {
        var li = document.createElement("li");
        li.innerText = date;
        attendanceList.appendChild(li);
      });
    } else {
      attendanceList.innerHTML = "<li>No attendance records yet.</li>";
    }

    // Schedule
    scheduleList.innerHTML = "";
    var courseSched = schedules[loggedInStudent.course] || [
      "No schedule available.",
    ];
    courseSched.forEach((item) => {
      var li = document.createElement("li");
      li.innerText = item;
      scheduleList.appendChild(li);
    });
  }
}

function logout() {
  localStorage.removeItem("loggedInStudentID");
  window.location.href = "/project.html";
}
