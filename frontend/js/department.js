const API = "/api/departments";

const did = document.getElementById("did");
const dname = document.getElementById("dname");
const code = document.getElementById("code");
const hod = document.getElementById("hod");

function headers() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  };
}

async function loadDepartments() {
  const res = await fetch(API, { headers: headers() });
  const data = await res.json();

  deptBody.innerHTML = data.map(d => `
    <tr onclick="selectRow(this)"
      data-id="${d._id}"
      data-name="${d.name}"
      data-code="${d.code}"
      data-hod="${d.hod}">
      <td>${d.name}</td>
      <td>${d.code}</td>
      <td>${d.hod}</td>
    </tr>
  `).join("");
}

function selectRow(row) {
  did.value = row.dataset.id;
  dname.value = row.dataset.name;
  code.value = row.dataset.code;
  hod.value = row.dataset.hod;
}

async function addDepartment() {
  await fetch(API + "/add", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      name: dname.value,
      code: code.value,
      hod: hod.value
    })
  });
  loadDepartments();
}

async function updateDepartment() {
  await fetch(API + "/update/" + did.value, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      name: dname.value,
      code: code.value,
      hod: hod.value
    })
  });
  loadDepartments();
}

async function deleteDepartment() {
  await fetch(API + "/delete/" + did.value, {
    method: "DELETE",
    headers: headers()
  });
  loadDepartments();
}

loadDepartments();
