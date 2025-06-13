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
