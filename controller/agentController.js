import {
  addAgent,
  updateAgent,
  deleteAgent,
  getAllAgents,
  validateAgent
} from "../model/agentModel.js";

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