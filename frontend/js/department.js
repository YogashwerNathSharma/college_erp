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

async function loadHodUsers(selectedHod = "") {
  try {
    const res = await fetch(API + "/hod-users", { headers: headers() });
    if (!res.ok) throw new Error("Failed to load HOD users");

    const users = await res.json();
    hod.innerHTML = '<option value="">Select HOD User</option>' +
      users.map(user => `
        <option value="${user._id}">${user.email}</option>
      `).join("");

    hod.value = selectedHod || "";
  } catch (err) {
    console.error("HOD dropdown load failed:", err);
    hod.innerHTML = '<option value="">Unable to load HOD users</option>';
  }
}

async function loadDepartments() {
  const res = await fetch(API, { headers: headers() });
  const data = await res.json();

  deptBody.innerHTML = data.map(d => `
    <tr onclick="selectRow(this)"
      data-id="${d._id}"
      data-name="${d.name}"
      data-code="${d.code || ""}"
      data-hod="${d.hod || ""}">
      <td>${d.name}</td>
      <td>${d.code || ""}</td>
      <td>${d.hod || ""}</td>
    </tr>
  `).join("");
}

async function selectRow(row) {
  did.value = row.dataset.id;
  dname.value = row.dataset.name;
  code.value = row.dataset.code;
  await loadHodUsers(row.dataset.hod);
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

loadHodUsers();
loadDepartments();
