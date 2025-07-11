/** GOAL!!!!!!!
 Student dashboard/** GOAL!!!!!!!
 Student dashboard
 * loads and displays student data.
 * modal for viewing schedules.
 * provides logout .
 * edits prodfile
 * data is retrieved from local storage so that it displays the necessary data coming from the admin dashboard stored in the local storage.
 */
document.addEventListener("DOMContentLoaded", function () {
  loadStudentData();

  // Schedule Modal logic
  const openScheduleBtn = document.getElementById("openScheduleModal");
  const scheduleModal = document.getElementById("scheduleModal");
  const closeScheduleBtn = document.getElementById("closeScheduleModal");
  const modalTable = document.getElementById("modalScheduleTable");

  if (openScheduleBtn && scheduleModal && closeScheduleBtn && modalTable) {
    openScheduleBtn.onclick = function () {
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
      var scheduleArr = loggedInStudent.schedule || [];
      if (scheduleArr.length === 0) {
        modalTable.innerHTML += `<tr><td colspan="3">No schedule available.</td></tr>`;
      } else {
        scheduleArr.forEach((item) => {
          modalTable.innerHTML += `<tr>
            <td>${item.day}</td>
            <td>${item.time}</td>
            <td>${item.subject}</td>
          </tr>`;
        });
      }
      scheduleModal.style.display = "block";
    };
    closeScheduleBtn.onclick = function () {
      scheduleModal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == scheduleModal) scheduleModal.style.display = "none";
    };
  }

  const openProfileBtn = document.getElementById("openProfileModal");
  const profileModal = document.getElementById("profileModal");
  const closeProfileBtn = document.getElementById("closeProfileModal");
  const profileForm = document.getElementById("profileForm");

  if (openProfileBtn && profileModal && closeProfileBtn && profileForm) {
    openProfileBtn.onclick = function () {
      var students = JSON.parse(localStorage.getItem("students")) || [];
      var loggedInStudentID = localStorage.getItem("loggedInStudentID");
      var loggedInStudent = students.find(
        (student) => student.id === loggedInStudentID
      );
      document.getElementById("editEmail").value = loggedInStudent.email || "";
      document.getElementById("editContact").value =
        loggedInStudent.contact || "";
      profileModal.style.display = "block";
    };
    closeProfileBtn.onclick = function () {
      profileModal.style.display = "none";
    };
    window.addEventListener("click", function (event) {
      if (event.target == profileModal) profileModal.style.display = "none";
    });
    profileForm.onsubmit = function (e) {
      e.preventDefault();
      var students = JSON.parse(localStorage.getItem("students")) || [];
      var loggedInStudentID = localStorage.getItem("loggedInStudentID");
      var loggedInStudent = students.find(
        (student) => student.id === loggedInStudentID
      );
      loggedInStudent.email = document.getElementById("editEmail").value.trim();
      loggedInStudent.contact = document
        .getElementById("editContact")
        .value.trim();
      var newPass = document.getElementById("editPassword").value.trim();
      if (newPass) {
        loggedInStudent.password = newPass;
      }
      localStorage.setItem("students", JSON.stringify(students));
      alert("Profile updated!");
      profileModal.style.display = "none";
      loadStudentData();
    };
  }

  // Combine modal background click logic for both modals
  window.onclick = function (event) {
    const scheduleModal = document.getElementById("scheduleModal");
    const profileModal = document.getElementById("profileModal");
    if (event.target === scheduleModal) scheduleModal.style.display = "none";
    if (event.target === profileModal) profileModal.style.display = "none";
  };
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
  window.location.href = "/PROJECT-Student-Information-System/index.html";
}

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
  window.location.href = "index.html";
}
