import { Agents } from "../db/db.js";

export function getAllAgents() {
  return Agents;
}

export function addAgent(
  ageId,
  admId,
  ageName,
  ageAddress,
  ageMobile,
  ageEmail
) {
  const newAgent = {
    ageId: ageId,
    admId: admId,
    ageName: ageName,
    ageAddress: ageAddress,
    ageMobile: ageMobile,
    ageEmail: ageEmail,
  };
  Agents.push(newAgent);
}

export function updateAgent(index, updatedAgent) {
  Agents[index] = updatedAgent;
}

export function deleteAgent(index) {
  Agents.splice(index, 1);
}

export function validateAgent(agent) {
  const ageIdPattern = /^S\d{3}$/;
  const adminIdPattern = /^[A-Za-z0-9-]+$/;
  const namePattern = /^[A-Za-z\s]+$/;
  const addressPattern = /^[A-Za-z0-9\s,.'-]+$/;
  const mobilePattern = /^\d{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isAgentIdValid = ageIdPattern.test(agent.ageId);
  const isAdminIdValid = adminIdPattern.test(agent.admId);
  const isNameValid = namePattern.test(agent.ageName);
  const isAddressValid = addressPattern.test(agent.ageAddress);
  const isMobileValid = mobilePattern.test(agent.ageMobile);
  const isEmailValid = emailPattern.test(agent.ageEmail);

  if (!isAgentIdValid) {
    swal({
      title: "Warning!",
      text: "Invalid Agent ID!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isAdminIdValid) {
    swal({
      title: "Warning!",
      text: "Please Input Admin ID!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isNameValid) {
    swal({
      title: "Warning!",
      text: "Invalid Supplier Name!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isAddressValid) {
    swal({
      title: "Warning!",
      text: "Invalid Address!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isMobileValid) {
    swal({
      title: "Warning!",
      text: "Invalid Mobile Number!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!isEmailValid) {
    swal({
      title: "Warning!",
      text: "Invalid Email Address!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }
  return true;
}
