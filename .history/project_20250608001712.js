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
    window.location.href = "student.html"; // for students
  } else if (username === "admin" && password === "admin123") {
    window.location.href = "admin.html"; // for admin
  } else {
    alert("Invalid credentials!");
  }
}
