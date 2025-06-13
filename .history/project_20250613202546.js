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
    // For demo: username: admin, password: admin123
    if (username === "admin" && password === "admin123") {
      window.location.href = "admin.html";
      return;
    }
    // You can add more faculty logic here if needed
  }

  alert("Invalid credentials!");
}
