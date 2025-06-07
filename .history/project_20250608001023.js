function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var students = JSON.parse(localStorage.getItem("students")) || [];

  var matchedStudent = students.find(
    (student) =>
      student.name === username &&
      (student.password
        ? student.password === password
        : password === "student123")
  );

  if (matchedStudent) {
    localStorage.setItem("loggedInStudentID", matchedStudent.id);

    // For student login
    window.location.href = "student.html";
  } else if (username === "admin" && password === "admin123") {
    // For admin login
    window.location.href = "admin.html";
  } else {
    alert("Invalid credentials!");
  }
  // For logout
  window.location.href = "index.html";
}
