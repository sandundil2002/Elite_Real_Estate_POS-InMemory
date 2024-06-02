import { getAllCustomer, getAllAppointments, addCustomer } from "../model/customerModel.js";

let foreignKeyInterval;

$(document).ready(function () {
  loadAllCustomers(getAllCustomer());
  loadAppointmentIDs();
  startForeignKeyLoad();

  $("#cus-app-id").on("change", function () {
    stopForeignKeyLoad();
    setTimeout(startForeignKeyLoad, 20000);
  });
});

function generateCustomerID() {
  let lastID = $("#cus-id").val();

  if (!lastID) {
    lastID = "C000";
  }

  let newID = "C" + (parseInt(lastID.slice(1)) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastCusID", newID);
  return newID;
}

function setCustomerID() {
  const newID = generateCustomerID();
  $("#cus-id").val(newID);
}

function loadAllCustomers(customers) {
  const tbody = $("#cus-tbl");

  customers.forEach((customer) => {
    const row = `<tr>
      <td>${customer.cusId}</td>
      <td>${customer.appId}</td>
      <td>${customer.cusName}</td>
      <td>${customer.address}</td>
      <td>${customer.cusMobile}</td>
      <td>${customer.cusEmail}</td>
    </tr>`;
    tbody.append(row);
  });
}

function loadAppointmentIDs() {
  const appointments = getAllAppointments();
  const selectElement = $("#cus-app-id");

  selectElement.empty();
  selectElement.append('<option value="">Appointment ID</option>');

  appointments.forEach((appointment) => {
    const option = `<option value="${appointment.appId}">${appointment.appId}</option>`;
    selectElement.append(option);
  });
}

function reloadTable(customerArray) {
  $("#cus-tbl").append(
    "<tr>" +
      "<td>" +
      customerArray[0] +
      "</td>" +
      "<td>" +
      customerArray[1] +
      "</td>" +
      "<td>" +
      customerArray[2] +
      "</td>" +
      "<td>" +
      customerArray[3] +
      "</td>" +
      "<td>" +
      customerArray[4] +
      "</td>" +
      "<td>" +
      customerArray[5] +
      "</td>" +
      "</tr>"
  );
}

$("#cus-add").click(function () {
  const customerArray = [
    $("#cus-id").val(),
    $("#cus-app-id").val(),
    $("#cus-name").val(),
    $("#cus-address").val(),
    $("#cus-mobile").val(),
    $("#cus-email").val(),
  ];

  const [cusId, appId, cusName, cusAddress, cusMobile, cusEmail] = customerArray;

  addCustomer(cusId, appId, cusName, cusAddress, cusMobile, cusEmail);
  reloadTable(customerArray);
});

function startForeignKeyLoad() {
  foreignKeyInterval = setInterval(loadAppointmentIDs, 1000);
}

function stopForeignKeyLoad() {
  clearInterval(foreignKeyInterval);
}
