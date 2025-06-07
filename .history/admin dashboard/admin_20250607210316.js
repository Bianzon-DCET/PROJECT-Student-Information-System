document.addEventListener("DOMContentLoaded", loadStudents);

let editMode = false;
let editIndex = null;

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
            <th>Actions</th>
        </tr>`;

  var students = JSON.parse(localStorage.getItem("students")) || [];

  students.forEach((student, index) => {
    var row = studentTable.insertRow(-1);
    row.insertCell(0).innerText = student.name;
    row.insertCell(1).innerText = student.id;
    row.insertCell(2).innerText = student.course || "None";
    row.insertCell(3).innerText = student.grade || "Pending";
    row.insertCell(4).innerHTML = `
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})" style="background-color:red;">Delete</button>`;
  });
}

function enrollStudent() {
  var name = document.getElementById("modalStudentName").value.trim();
  var id = document.getElementById("modalStudentID").value.trim();
  var course = document.getElementById("modalStudentCourse").value.trim();
  var grade = document.getElementById("modalStudentGrade").value.trim();

  if (!name || !id || !course || !grade) {
    alert("Please fill in all fields.");
    return;
  }

  var students = JSON.parse(localStorage.getItem("students")) || [];
  students.push({ name, id, course, grade });

  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
  closeModal();
}

function editStudent(index) {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  var student = students[index];

  document.getElementById("modalStudentName").value = student.name;
  document.getElementById("modalStudentID").value = student.id;
  document.getElementById("modalStudentCourse").value = student.course; // works for select
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

  var name =
    document.getElementById("modalStudentName").value.trim() || student.name;
  var id = document.getElementById("modalStudentID").value.trim() || student.id;
  var course =
    document.getElementById("modalStudentCourse").value.trim() ||
    student.course;
  var grade =
    document.getElementById("modalStudentGrade").value.trim() || student.grade;

  students[editIndex] = { name, id, course, grade };

  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
  closeModal();

  editMode = false;
  editIndex = null;
  document.querySelector("#enrollForm button[type='submit']").textContent =
    "Enroll";
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

window.onclick = function (event) {
  var modal = document.getElementById("enrollModal");
  if (event.target == modal) {
    closeModal();
  }
};
