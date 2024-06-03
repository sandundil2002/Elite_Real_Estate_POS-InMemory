import {
  getAllProperties,
  getAllAgents,
  addProperty,
  updateProperty,
  deleteProperty,
  validateProperty,
} from "../model/PropertyModel.js";

let foreignKeyInterval;

$(document).ready(function () {
  loadAllProperties(getAllProperties());
  loadAgentsIDs();
  startForeignKeyLoad();

  $("#pro-age-id").on("change", function () {
    stopForeignKeyLoad();
    setTimeout(startForeignKeyLoad, 20000);
  });
});

function generatePropertyID() {
  let lastID = $("#pro-id").val();

  if (!lastID) {
    lastID = "P000";
  }

  let newID = "P" + (parseInt(lastID.slice(1)) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastProID", newID);
  return newID;
}

function setPropertyID() {
  const newID = generatePropertyID();
  $("#pro-id").val(newID);
}

function loadAgentsIDs() {
  const agents = getAllAgents();
  const selectElement = $("#pro-age-id");

  selectElement.empty();
  selectElement.append('<option value="">Supplier ID</option>');

  agents.forEach((agent) => {
    const option = `<option value="${agent.ageId}">${agent.ageId}</option>`;
    selectElement.append(option);
  });
}

function loadAllProperties(properties) {
  const tbody = $("#pro-tbl");

  properties.forEach((properties) => {
    const row = `<tr>
      <td>${properties.proId}</td>
      <td>${properties.ageId}</td>
      <td>${properties.type}</td>
      <td>${properties.proAddress}</td>
      <td>${properties.price}</td>
      <td>${properties.perches}</td>
    </tr>`;
    tbody.append(row);
  });
}

function startForeignKeyLoad() {
  foreignKeyInterval = setInterval(loadAgentsIDs, 1000);
}

function stopForeignKeyLoad() {
  clearInterval(foreignKeyInterval);
}
