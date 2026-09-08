const API = "/api/departments";

const did = document.getElementById("did");
const dname = document.getElementById("dname");
const code = document.getElementById("code");
const hod = document.getElementById("hod");

let hodUsers = [];

function headers() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  };
}

function getUserLabel(user) {
  return user.displayName || user.name || user.fullName || user.username || user.email || user._id;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function loadHodUsers(selectedHod = "") {
  try {
    const res = await fetch(API + "/hod-users", { headers: headers() });
    if (!res.ok) throw new Error("Failed to load HOD users");

    hodUsers = await res.json();

    hod.innerHTML = '<option value="">Select HOD / Teacher</option>' +
      hodUsers.map(user => `
        <option value="${escapeHtml(user._id)}">${escapeHtml(getUserLabel(user))}</option>
      `).join("");

    hod.value = selectedHod || "";
  } catch (err) {
    console.error("HOD dropdown load failed:", err);
    hod.innerHTML = '<option value="">Unable to load HOD / Teacher list</option>';
  }
}

function getHodLabel(id) {
  if (!id) return "";
  const user = hodUsers.find(u => String(u._id) === String(id));
  return user ? getUserLabel(user) : id;
}

async function loadDepartments() {
  const res = await fetch(API, { headers: headers() });
  const data = await res.json();

  deptBody.innerHTML = data.map(d => `
    <tr onclick="selectRow(this)"
      data-id="${escapeHtml(d._id)}"
      data-name="${escapeHtml(d.name)}"
      data-code="${escapeHtml(d.code || "")}"
      data-hod="${escapeHtml(d.hod || "")}">
      <td>${escapeHtml(d.name)}</td>
      <td>${escapeHtml(d.code || "")}</td>
      <td>${escapeHtml(getHodLabel(d.hod))}</td>
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

loadHodUsers().then(loadDepartments);
