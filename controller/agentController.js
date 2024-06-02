import {
  addAgent,
  updateAgent,
  deleteAgent,
  getAllAgents,
  validateAgent
} from "../model/agentModel.js";

$(document).ready(function () {
    loadAllAgents(getAllAgents());
});

function generateAgentID() {
  let lastID = $("#age-id").val();

  if (!lastID) {
    lastID = "Age000";
  }

  let newID = "Age" + (parseInt(lastID.slice(1)) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastAgeID", newID);
  return newID;
}

function setAgentID() {
  const newID = generateAgentID();
  $("#age-id").val(newID);
}

function loadAllAgents(agents) {
  const tbody = $("#age-tbl");

  agents.forEach((agent) => {
    const row = `<tr>
      <td>${agent.ageId}</td>
      <td>${agent.admId}</td>
      <td>${agent.ageName}</td>
      <td>${agent.ageAddress}</td>
      <td>${agent.ageMobile}</td>
      <td>${agent.ageEmail}</td>
    </tr>`;
    tbody.append(row);
  });
}