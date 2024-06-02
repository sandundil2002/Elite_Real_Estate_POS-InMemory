import {
  addAgent,
  updateAgent,
  deleteAgent,
  getAllAgents,
  validateAgent,
} from "../model/agentModel.js";

$(document).ready(function () {
  loadAllAgents(getAllAgents());
});

function generateAgentID() {
  let lastID = $("#age-id").val();

  if (!lastID) {
    lastID = "S000";
  }

  let newID = "S" + (parseInt(lastID.slice(1)) + 1).toString().padStart(3, "0");
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

function reloadTable(agentArray) {
  $("#age-tbl").append(
    "<tr>" +
      "<td>" +
      agentArray[0] +
      "</td>" +
      "<td>" +
      agentArray[1] +
      "</td>" +
      "<td>" +
      agentArray[2] +
      "</td>" +
      "<td>" +
      agentArray[3] +
      "</td>" +
      "<td>" +
      agentArray[4] +
      "</td>" +
      "<td>" +
      agentArray[5] +
      "</td>" +
      "</tr>"
  );
}

function updateTable(index, updatedAgent) {
  const tableBody = $("#age-tbl");
  const row = tableBody.find("tr").eq(index);

  row.find("td").eq(0).text(updatedAgent.ageId);
  row.find("td").eq(1).text(updatedAgent.admId);
  row.find("td").eq(2).text(updatedAgent.name);
  row.find("td").eq(3).text(updatedAgent.address);
  row.find("td").eq(4).text(updatedAgent.mobile);
  row.find("td").eq(5).text(updatedAgent.email);
}

$("#age-add").click(function () {
  const agentArray = [
    $("#age-id").val(),
    $("#age-adm-id").val(),
    $("#age-name").val(),
    $("#age-address").val(),
    $("#age-mobile").val(),
    $("#age-email").val(),
  ];

  const [ageId, admId, ageName, ageAddress, ageMobile, ageEmail] = agentArray;

  if (checkValidation()) {
    addAgent(ageId, admId, ageName, ageAddress, ageMobile, ageEmail);
    reloadTable(agentArray);
    setAgentID();
  }
});

function checkValidation() {
  const agent = {
    ageId: $("#age-id").val(),
    admId: $("#age-adm-id").val(),
    ageName: $("#age-name").val(),
    ageAddress: $("#age-address").val(),
    ageMobile: $("#age-mobile").val(),
    ageEmail: $("#age-email").val(),
  };

  return validateAgent(agent);
}
