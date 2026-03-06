const id = document.getElementById("id");
const name = document.getElementById("name");
const email = document.getElementById("email");
const course = document.getElementById("course");
const API = "/api/students";

async function loadStudents() {
  const res = await fetch(API, {
    headers: getAuthHeaders()
  });

  const data = await res.json();
  // table fill code
}
function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  };
}

async function loadStudents() {
  const res = await fetch(API);
  const data = await res.json();


  tableBody.innerHTML = data.map(s => `
    <tr onclick="selectRow(this)"
      data-id="${s._id}"
      data-name="${s.name}"
      data-email="${s.email}"
      data-course="${s.course}">
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.course}</td>
    </tr>
  `).join("");
}

function selectRow(row) {
  id.value = row.dataset.id;
  name.value = row.dataset.name;
  email.value = row.dataset.email;
  course.value = row.dataset.course;
}
function toggleMenu(){
  document.querySelector(".sidebar").classList.toggle("active");
}
async function addStudent() {

  if (!name.value.trim()) {
    alert("Name is required");
    return;
  }

  const res = await fetch(API + "/add", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name: name.value.trim(),
      email: email.value.trim(),
      course: course.value.trim()
    })
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.message || "Server error");
    return;
  }

  clearForm();
  loadStudents();
}


async function updateStudent() {
  await fetch(API + "/update/" + id.value, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      course: course.value,
      
    })
  });
  clearForm();
  loadStudents();
}

async function deleteStudent() {
  await fetch(API + "/delete/" + id.value, { method: "DELETE" });
  clearForm();
  loadStudents();
}

function clearForm() {
  id.value = "";
  name.value = "";
  email.value = "";
  course.value = "";
}

loadStudents();
