/** GOAL!!!!!!!
 Student dashboard
 * loads and displays student data.
 * modal for viewing schedules.
 * provides logout .
 * edits prodfile
 * data is retrieved from local storage so that it displays the necessary data coming from the admin dashboard stored in the local storage.
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
  window.location.href = "/index.html";
}
