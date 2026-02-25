const COURSE_API = "/api/courses";

const cid = document.getElementById("cid");
const cname = document.getElementById("cname");
const duration = document.getElementById("duration");
const fees = document.getElementById("fees");

function authHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  };
}

async function loadCourses() {
  const res = await fetch(COURSE_API, { headers: authHeaders() });
  const data = await res.json();

  courseBody.innerHTML = data.map(c => `
    <tr onclick="selectCourse(this)"
      data-id="${c._id}"
      data-name="${c.name}"
      data-duration="${c.duration}"
      data-fees="${c.fees}">
      <td>${c.name}</td>
      <td>${c.duration}</td>
      <td>${c.fees}</td>
    </tr>
  `).join("");
}

function selectCourse(row) {
  cid.value = row.dataset.id;
  cname.value = row.dataset.name;
  duration.value = row.dataset.duration;
  fees.value = row.dataset.fees;
}

async function addCourse() {
  if (!cname.value.trim()) {
    alert("Course name required");
    return;
  }

  await fetch(COURSE_API + "/add", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      name: cname.value,
      duration: duration.value,
      fees: fees.value
    })
  });

  loadCourses();
}

async function updateCourse() {
  await fetch(COURSE_API + "/update/" + cid.value, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({
      name: cname.value,
      duration: duration.value,
      fees: fees.value
    })
  });

  loadCourses();
}

async function deleteCourse() {
  await fetch(COURSE_API + "/delete/" + cid.value, {
    method: "DELETE",
    headers: authHeaders()
  });

  loadCourses();
}

loadCourses();
