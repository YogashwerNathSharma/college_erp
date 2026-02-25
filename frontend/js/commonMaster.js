const masterContent = document.getElementById("masterContent");

let CURRENT_MASTER = "";
let editId = null;

function loadMaster(type, title) {
  CURRENT_MASTER = type;
  editId = null;

  masterContent.innerHTML = `
    <h2>${title} Master</h2>

    <input id="masterName" placeholder="${title} Name">
    <input id="masterCode" placeholder="${title} Code">

    <label>
      <input type="checkbox" id="masterActive" checked> Is Active
    </label>
    <br><br>

    <button onclick="saveMaster()">Save</button>
    <button onclick="updateMaster()">Update</button>
    <button onclick="resetMaster()">New</button>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="masterTable"></tbody>
    </table>
  `;

  loadMasterTable();
}

async function loadMasterTable() {
  const data = await fetch(`/api/master/${CURRENT_MASTER}`).then(r => r.json());

  masterTable.innerHTML = data.map(m => `
    <tr>
      <td>${m.name}</td>
      <td>${m.code || ""}</td>
      <td>${m.isActive ? "✔" : "✖"}</td>
      <td>
        <button onclick="editMaster('${m._id}')">Edit</button>
        <button onclick="deleteMaster('${m._id}')">Delete</button>
      </td>
    </tr>
  `).join("");
}

async function saveMaster() {
  await fetch("/api/master", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      masterType: CURRENT_MASTER,
      name: masterName.value,
      code: masterCode.value,
      isActive: masterActive.checked
    })
  });
  resetMaster();
  loadMasterTable();
}

async function editMaster(id) {
  const m = await fetch(`/api/master/one/${id}`).then(r => r.json());

  editId = id;
  masterName.value = m.name;
  masterCode.value = m.code || "";
  masterActive.checked = m.isActive;
}

async function updateMaster() {
  if (!editId) return alert("Select record first");

  await fetch(`/api/master/${editId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: masterName.value,
      code: masterCode.value,
      isActive: masterActive.checked
    })
  });

  resetMaster();
  loadMasterTable();
}

async function deleteMaster(id) {
  if (!confirm("Deactivate this record?")) return;

  await fetch(`/api/master/deactivate/${id}`, { method: "PUT" });
  resetMaster();
  loadMasterTable();
}
function loadSessionMaster() {
  CURRENT_MASTER = "session";
  editId = null;

  masterContent.innerHTML = `
    <h2>Session Master</h2>

    <input id="masterName" placeholder="Session Name (2024-25)">
    <input id="masterCode" placeholder="Session Code (2024_25)">

    <label>Start Date</label>
    <input type="date" id="startDate">

    <label>End Date</label>
    <input type="date" id="endDate">

    <label>
      <input type="checkbox" id="masterActive"> Is Active
    </label>

    <br><br>

    <button onclick="saveSession()">Save</button>
    <button onclick="updateSession()">Update</button>
    <button onclick="resetSession()">New</button>

    <table>
      <thead>
        <tr>
          <th>Session</th>
          <th>Duration</th>
          <th>Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="masterTable"></tbody>
    </table>
  `;

  loadSessionTable();
}
async function loadSessionTable() {
  const data = await fetch(`/api/master/session`).then(r => r.json());

  masterTable.innerHTML = data.map(s => `
    <tr>
      <td>${s.name}</td>
      <td>${s.extra?.startDate || ""} → ${s.extra?.endDate || ""}</td>
      <td>${s.isActive ? "✔" : "✖"}</td>
      <td>
        <button onclick="editSession('${s._id}')">Edit</button>
        <button onclick="deleteSession('${s._id}')">Deactivate</button>
      </td>
    </tr>
  `).join("");
}
async function saveSession() {
  // deactivate all previous sessions
  if (masterActive.checked) {
    const all = await fetch(`/api/master/session`).then(r => r.json());
    for (let s of all) {
      await fetch(`/api/master/${s._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: false })
      });
    }
  }

  await fetch("/api/master", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      masterType: "session",
      name: masterName.value,
      code: masterCode.value,
      isActive: masterActive.checked,
      extra: {
        startDate: startDate.value,
        endDate: endDate.value
      }
    })
  });

  resetSession();
  loadSessionTable();
}
async function editSession(id) {
  const s = await fetch(`/api/master/one/${id}`).then(r => r.json());

  editId = id;
  masterName.value = s.name;
  masterCode.value = s.code;
  startDate.value = s.extra?.startDate || "";
  endDate.value = s.extra?.endDate || "";
  masterActive.checked = s.isActive;
}
async function updateSession() {
  if (!editId) return alert("Select session first");

  // only one active session allowed
  if (masterActive.checked) {
    const all = await fetch(`/api/master/session`).then(r => r.json());
    for (let s of all) {
      if (s._id !== editId) {
        await fetch(`/api/master/${s._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: false })
        });
      }
    }
  }

  await fetch(`/api/master/${editId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: masterName.value,
      code: masterCode.value,
      isActive: masterActive.checked,
      extra: {
        startDate: startDate.value,
        endDate: endDate.value
      }
    })
  });

  resetSession();
  loadSessionTable();
}
async function deleteSession(id) {
  if (!confirm("Deactivate this session?")) return;

  await fetch(`/api/master/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive: false })
  });

  resetSession();
  loadSessionTable();
}

function resetMaster() {
  editId = null;
  masterName.value = "";
  masterCode.value = "";
  masterActive.checked = true;
}
