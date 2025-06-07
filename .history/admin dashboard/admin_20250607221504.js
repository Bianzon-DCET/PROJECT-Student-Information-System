document.addEventListener("DOMContentLoaded", loadStudents);

let editMode = false;
let editIndex = null;
let currentScheduleIndex = null;
let tempSchedule = [];

document.addEventListener("DOMContentLoaded", function () {
  loadStudents();
  document
    .getElementById("enrollForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      if (editMode) {
        updateStudent();
      } else {
        enrollStudent();
      }
    });
});

function loadStudents() {
  var studentTable = document.getElementById("studentTable");
  studentTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Course</th>
            <th>Grade</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
        </tr>`;

  var students = JSON.parse(localStorage.getItem("students")) || [];

  students.forEach((student, index) => {
    var row = studentTable.insertRow(-1);
    row.insertCell(0).innerText = student.name;
    row.insertCell(1).innerText = student.id;
    row.insertCell(2).innerText = student.course || "None";
    row.insertCell(3).innerText = student.grade || "Pending";
    row.insertCell(4).innerText = student.email || "N/A";
    row.insertCell(5).innerText = student.contact || "N/A";
    row.insertCell(6).innerHTML = `
      <button onclick="editStudent(${index})">Edit</button>
      <button onclick="deleteStudent(${index})" style="background-color:red;">Un-Enroll</button>
      <button onclick="markAttendance(${index})" style="background-color:green;">Mark Attendance</button>
      <button onclick="openScheduleModal(${index})" style="background-color:#007bff;">Set Schedule</button>
    `;
  });
}

function enrollStudent() {
  var name = document.getElementById("modalStudentName").value.trim();
  var id = document.getElementById("modalStudentID").value.trim();
  var course = document.getElementById("modalStudentCourse").value.trim();
  var grade = document.getElementById("modalStudentGrade").value.trim();
  var email = document.getElementById("modalStudentEmail").value.trim();
  var contact = document.getElementById("modalStudentContact").value.trim();

  if (!name || !id || !course || !email) {
    alert("Please fill in all required fields.");
    return;
  }

  var students = JSON.parse(localStorage.getItem("students")) || [];
  students.push({
    name,
    id,
    course,
    grade,
    email,
    contact,
    attendance: [],
    billing: "Unpaid",
  });

  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
  closeModal();
}

function editStudent(index) {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  var student = students[index];

  document.getElementById("modalStudentName").value = student.name;
  document.getElementById("modalStudentID").value = student.id;
  document.getElementById("modalStudentCourse").value = student.course;
  document.getElementById("modalStudentGrade").value = student.grade;

  editMode = true;
  editIndex = index;

  document.querySelector("#enrollForm button[type='submit']").textContent =
    "Update";
  openModal();
}

function updateStudent() {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  var student = students[editIndex];

  var name = document.getElementById("modalStudentName").value.trim() || student.name;
  var id = document.getElementById("modalStudentID").value.trim() || student.id;
  var course = document.getElementById("modalStudentCourse").value.trim() || student.course;
  var grade = document.getElementById("modalStudentGrade").value.trim() || student.grade;
  var email = document.getElementById("modalStudentEmail").value.trim() || student.email;
  var contact = document.getElementById("modalStudentContact").value.trim() || student.contact;

  // Preserve existing fields like attendance, billing, schedule
  students[editIndex] = {
    ...student,
    name,
    id,
    course,
    grade,
    email,
    contact
  };

  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
  closeModal();

  editMode = false;
  editIndex = null;
  document.querySelector("#enrollForm button[type='submit']").textContent = "Enroll";
}

function deleteStudent(index) {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
}

function logout() {
  window.location.href = "/project.html";
}

function openModal() {
  document.getElementById("enrollModal").style.display = "block";
}

function closeModal() {
  document.getElementById("enrollModal").style.display = "none";
  document.getElementById("enrollForm").reset();

  editMode = false;
  editIndex = null;
  document.querySelector("#enrollForm button[type='submit']").textContent =
    "Enroll";
}

// Add this function
function markAttendance(index) {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  var today = new Date().toLocaleDateString();
  if (!students[index].attendance) students[index].attendance = [];
  if (!students[index].attendance.includes(today)) {
    students[index].attendance.push(today);
    localStorage.setItem("students", JSON.stringify(students));
    alert("Attendance marked for today!");
  } else {
    alert("Attendance already marked for today.");
  }
  loadStudents();
}

function openScheduleModal(index) {
  currentScheduleIndex = index;
  var students = JSON.parse(localStorage.getItem("students")) || [];
  var student = students[index];
  tempSchedule = student.schedule
    ? JSON.parse(JSON.stringify(student.schedule))
    : [];
  renderScheduleTable();
  document.getElementById("scheduleModal").style.display = "block";
}

function closeScheduleModal() {
  document.getElementById("scheduleModal").style.display = "none";
  currentScheduleIndex = null;
  tempSchedule = [];
}

function renderScheduleTable() {
  var table = document.getElementById("scheduleTable");
  table.innerHTML = `
    <tr>
      <th>Day</th>
      <th>Time</th>
      <th>Subject</th>
      <th>Action</th>
    </tr>
  `;
  tempSchedule.forEach((sched, idx) => {
    var row = table.insertRow(-1);
    row.insertCell(0).innerText = sched.day;
    row.insertCell(1).innerText = sched.time;
    row.insertCell(2).innerText = sched.subject;
    row.insertCell(
      3
    ).innerHTML = `<button type="button" onclick="removeScheduleRow(${idx})" style="background:#e74c3c;">Remove</button>`;
  });
}

function addScheduleRow() {
  var day = document.getElementById("schedDay").value;
  var startTime = document.getElementById("schedStartTime").value;
  var endTime = document.getElementById("schedEndTime").value;
  var subject = document.getElementById("schedSubject").value;
  if (day && startTime && endTime && subject) {
    var time = startTime + " - " + endTime;
    tempSchedule.push({ day, time, subject });
    renderScheduleTable();
    document.getElementById("schedDay").value = "";
    document.getElementById("schedStartTime").value = "";
    document.getElementById("schedEndTime").value = "";
    document.getElementById("schedSubject").value = "";
  } else {
    alert("Please fill in all schedule fields before adding.");
  }
}

function removeScheduleRow(idx) {
  tempSchedule.splice(idx, 1);
  renderScheduleTable();
}

document.getElementById("scheduleForm").onsubmit = function (e) {
  e.preventDefault();
  if (currentScheduleIndex !== null) {
    var students = JSON.parse(localStorage.getItem("students")) || [];
    students[currentScheduleIndex].schedule = tempSchedule;
    localStorage.setItem("students", JSON.stringify(students));
    alert("Schedule saved!");
    closeScheduleModal();
  }
};

window.onclick = function (event) {
  var enrollModal = document.getElementById("enrollModal");
  var scheduleModal = document.getElementById("scheduleModal");
  if (event.target == enrollModal) closeModal();
  if (event.target == scheduleModal) closeScheduleModal();
};
