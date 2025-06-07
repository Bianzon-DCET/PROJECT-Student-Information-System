document.addEventListener("DOMContentLoaded", function() {
  loadStudentData();

  // Modal logic
  const openBtn = document.getElementById("openScheduleModal");
  const modal = document.getElementById("scheduleModal");
  const closeBtn = document.getElementById("closeScheduleModal");
  const modalTable = document.getElementById("modalScheduleTable");

  if (openBtn && modal && closeBtn && modalTable) {
    openBtn.onclick = function() {
      // Fill modal table with schedule
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
          { day: "Wed", time: "10-12pm", subject: "Networking" }
        ],
        BSCS: [
          { day: "Tue", time: "9-11am", subject: "Algorithms" },
          { day: "Thu", time: "1-3pm", subject: "Data Science" }
        ],
        BSEd: [
          { day: "Mon", time: "1-3pm", subject: "Education Theory" },
          { day: "Fri", time: "8-10am", subject: "Practice Teaching" }
        ],
        BSBA: [
          { day: "Tue", time: "8-10am", subject: "Accounting" },
          { day: "Thu", time: "10-12pm", subject: "Marketing" }
        ],
        BSA: [
          { day: "Mon", time: "10-12pm", subject: "Auditing" },
          { day: "Wed", time: "1-3pm", subject: "Taxation" }
        ],
        BSCE: [
          { day: "Tue", time: "1-3pm", subject: "Statics" },
          { day: "Fri", time: "10-12pm", subject: "Surveying" }
        ],
      };
      var courseSched = schedules[loggedInStudent.course] || [];
      if (courseSched.length === 0) {
        modalTable.innerHTML += `<tr><td colspan="3">No schedule available.</td></tr>`;
      } else {
        courseSched.forEach(item => {
          modalTable.innerHTML += `<tr>
            <td>${item.day}</td>
            <td>${item.time}</td>
            <td>${item.subject}</td>
          </tr>`;
        });
      }
      modal.style.display = "block";
    };
    closeBtn.onclick = function() {
      modal.style.display = "none";
    };
    window.onclick = function(event) {
      if (event.target == modal) modal.style.display = "none";
    };
  }

  // Profile modal logic
  const openProfileBtn = document.getElementById("openProfileModal");
  const profileModal = document.getElementById("profileModal");
  const closeProfileBtn = document.getElementById("closeProfileModal");
  const profileForm = document.getElementById("profileForm");

  if (openProfileBtn && profileModal && closeProfileBtn && profileForm) {
    openProfileBtn.onclick = function() {
      // Fill form with current data
      var students = JSON.parse(localStorage.getItem("students")) || [];
      var loggedInStudentID = localStorage.getItem("loggedInStudentID");
      var loggedInStudent = students.find(
        (student) => student.id === loggedInStudentID
      );
      document.getElementById("editEmail").value = loggedInStudent.email || "";
      document.getElementById("editContact").value = loggedInStudent.contact || "";
      profileModal.style.display = "block";
    };
    closeProfileBtn.onclick = function() {
      profileModal.style.display = "none";
    };
    window.addEventListener("click", function(event) {dow.addEventListener("click", function(event) {
      if (event.target == profileModal) profileModal.style.display = "none";      if (event.target == profileModal) profileModal.style.display = "none";
    });
    profileForm.onsubmit = function(e) {ofileForm.onsubmit = function(e) {
      e.preventDefault();      e.preventDefault();
      var students = JSON.parse(localStorage.getItem("students")) || [];ge.getItem("students")) || [];
      var loggedInStudentID = localStorage.getItem("loggedInStudentID");.getItem("loggedInStudentID");
      var loggedInStudent = students.find(var loggedInStudent = students.find(
        (student) => student.id === loggedInStudentID        (student) => student.id === loggedInStudentID
      );
      loggedInStudent.email = document.getElementById("editEmail").value.trim();m();
      loggedInStudent.contact = document.getElementById("editContact").value.trim();loggedInStudent.contact = document.getElementById("editContact").value.trim();
      var newPass = document.getElementById("editPassword").value.trim();      var newPass = document.getElementById("editPassword").value.trim();
      if (newPass) {
        loggedInStudent.password = newPass;assword = newPass;
      }
      localStorage.setItem("students", JSON.stringify(students));
      alert("Profile updated!");
      profileModal.style.display = "none";
      loadStudentData();adStudentData();
    };    };
  }
});

function loadStudentData() {
  var studentName = document.getElementById("studentName");
  var studentID = document.getElementById("studentID");mentById("studentID");
  var studentCourse = document.getElementById("studentCourse");
  var gradeTable = document.getElementById("gradeTable");;
  var studentEmail = document.getElementById("studentEmail");dentEmail = document.getElementById("studentEmail");
  var studentContact = document.getElementById("studentContact");  var studentContact = document.getElementById("studentContact");
  var attendanceList = document.getElementById("attendanceList");
  var billingStatus = document.getElementById("billingStatus");billingStatus");
  var scheduleList = document.getElementById("scheduleList");("scheduleList");

  var students = JSON.parse(localStorage.getItem("students")) || [];tudents = JSON.parse(localStorage.getItem("students")) || [];
  var loggedInStudentID = localStorage.getItem("loggedInStudentID");loggedInStudentID = localStorage.getItem("loggedInStudentID");

  var loggedInStudent = students.find(ar loggedInStudent = students.find(
    (student) => student.id === loggedInStudentID    (student) => student.id === loggedInStudentID
  );

  if (loggedInStudent) {
    studentName.innerText = loggedInStudent.name;
    studentID.innerText = loggedInStudent.id;
    studentCourse.innerText = loggedInStudent.course;
    studentEmail.innerText = loggedInStudent.email || "N/A";
    studentContact.innerText = loggedInStudent.contact || "N/A";
    billingStatus.innerText = loggedInStudent.billing || "Unpaid";d";

    // Grades    // Grades
    gradeTable.innerHTML = `
      <tr>
        <th>Course</th>        <th>Course</th>
        <th>Grade</th>
      </tr>
      <tr>  <tr>
        <td>${loggedInStudent.course}</td>        <td>${loggedInStudent.course}</td>
        <td>${loggedInStudent.grade || "Pending"}</td>udent.grade || "Pending"}</td>
      </tr>
    `;

    // Attendance
    attendanceList.innerHTML = "";
    if (loggedInStudent.attendance && loggedInStudent.attendance.length > 0) {ength > 0) {
      loggedInStudent.attendance.forEach((date) => {      loggedInStudent.attendance.forEach((date) => {
        var li = document.createElement("li");i = document.createElement("li");
        li.innerText = date;
        attendanceList.appendChild(li);tendanceList.appendChild(li);
      });
    } else {
      attendanceList.innerHTML = "<li>No attendance records yet.</li>";danceList.innerHTML = "<li>No attendance records yet.</li>";
    }

    // Schedule (simple demo, you can expand this)
    scheduleList.innerHTML = "";eList.innerHTML = "";
    var schedules = {r schedules = {
      BSIT: ["Mon 8-10am: Programming", "Wed 10-12pm: Networking"],      BSIT: ["Mon 8-10am: Programming", "Wed 10-12pm: Networking"],
      BSCS: ["Tue 9-11am: Algorithms", "Thu 1-3pm: Data Science"], 9-11am: Algorithms", "Thu 1-3pm: Data Science"],
      BSEd: ["Mon 1-3pm: Education Theory", "Fri 8-10am: Practice Teaching"], Theory", "Fri 8-10am: Practice Teaching"],
      BSBA: ["Tue 8-10am: Accounting", "Thu 10-12pm: Marketing"],
      BSA: ["Mon 10-12pm: Auditing", "Wed 1-3pm: Taxation"],ation"],
      BSCE: ["Tue 1-3pm: Statics", "Fri 10-12pm: Surveying"],m: Surveying"],
    };
    var courseSched = schedules[loggedInStudent.course] || [nStudent.course] || [
      "No schedule available.", schedule available.",
    ];
    courseSched.forEach((item) => {
      var li = document.createElement("li"); var li = document.createElement("li");
      li.innerText = item;      li.innerText = item;
      scheduleList.appendChild(li);
    });
  }
}

function logout() {
  localStorage.removeItem("loggedInStudentID");
  window.location.href = "/project.html";
}
