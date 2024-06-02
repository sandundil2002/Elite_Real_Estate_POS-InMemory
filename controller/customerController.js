import { getAllCustomer } from "../model/customerModel";

function generateCustomerID() {
  let lastID = $("#cus-id").val();

  if (!lastID) {
    lastID = "C000";
  }

  let newID = "C" + (parseInt(lastID.slice(1)) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastCusID", newID);
  return newID;
}

function setAppointmentID() {
  const newID = generateCustomerID();
  $("#cus-id").val(newID);
}