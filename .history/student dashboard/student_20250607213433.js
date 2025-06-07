document.addEventListener("DOMContentLoaded", loadStudentData);

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

    // Schedule (simple demo, you can expand this)
    scheduleList.innerHTML = "";
    var schedules = {
      BSIT: ["Mon 8-10am: Programming", "Wed 10-12pm: Networking"],
      BSCS: ["Tue 9-11am: Algorithms", "Thu 1-3pm: Data Science"],
      BSEd: ["Mon 1-3pm: Education Theory", "Fri 8-10am: Practice Teaching"],
      BSBA: ["Tue 8-10am: Accounting", "Thu 10-12pm: Marketing"],
      BSA: ["Mon 10-12pm: Auditing", "Wed 1-3pm: Taxation"],
      BSCE: ["Tue 1-3pm: Statics", "Fri 10-12pm: Surveying"],
    };
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
