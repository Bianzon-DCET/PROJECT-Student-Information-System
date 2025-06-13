document.addEventListener("DOMContentLoaded", function () {
  const studentBtn = document.getElementById("studentBtn");
  const facultyBtn = document.getElementById("facultyBtn");
  const loginForm = document.getElementById("loginForm");
  const roleInput = document.getElementById("role");
  const roleSelect = document.getElementById("role-select");

  studentBtn.onclick = function () {
    roleInput.value = "student";
    loginForm.style.display = "block";
    roleSelect.style.display = "none";
  };
  facultyBtn.onclick = function () {
    roleInput.value = "faculty";
    loginForm.style.display = "block";
    roleSelect.style.display = "none";
  };

  loginForm.onsubmit = function (e) {
    e.preventDefault();
    login();
  };
});

function login() {
  var role = document.getElementById("role").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var students = JSON.parse(localStorage.getItem("students")) || [];

  if (role === "student") {
    var matchedStudent = students.find(
      (student) =>
        student.name === username &&
        (student.password
          ? student.password === password
          : password === "student123")
    );
    if (matchedStudent) {
      localStorage.setItem("loggedInStudentID", matchedStudent.id);
      window.location.href = "student.html";
      return;
    }
  } else if (role === "faculty") {
    if (username === "admin" && password === "admin123") {
      window.location.href = "admin.html";
      return;
    }
  }
  alert("Invalid credentials!");
}
