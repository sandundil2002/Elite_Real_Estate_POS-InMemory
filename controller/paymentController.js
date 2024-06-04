import {
  getAllPayments,
  getAllProperties,
  getAllCustomers,
} from "../model/paymentModel.js";

let proForeignKeyInterval;
let cusForeignKeyInterval;

$(document).ready(function () {
  setLocalDateTime();
  setPaymentID();
  startForeignKeyLoad()
  setTimeout(setLocalDateTime(), 60000);

  $("#pay-pro-id").on("change", function () {
    stopForeignKeyLoad();
    setTimeout(startForeignKeyLoad, 20000);
  });

  $("#pay-cus-id").on("change", function () {
    stopForeignKeyLoad();
    setTimeout(startForeignKeyLoad, 20000);
  });
});

function setLocalDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  document.getElementById("pay-date").value = formattedDateTime;
}

function generatePaymentID() {
  let lastID = $("#pay-id").val();

  if (!lastID) {
    lastID = "O000";
  }

  let newID = "O" + (parseInt(lastID.slice(1)) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastPayID", newID);
  return newID;
}

function setPaymentID() {
  const newID = generatePaymentID();
  $("#pay-id").val(newID);
}

function loadPropertyIDs() {
  const properties = getAllProperties();
  const selectElement = $("#pay-pro-id");

  selectElement.empty();
  selectElement.append('<option value="">Property ID</option>');

  properties.forEach((property) => {
    const option = `<option value="${property.proId}">${property.proId}</option>`;
    selectElement.append(option);
  });
}

function loadCustomerIDs() {
  const customers = getAllCustomers();
  const selectElement = $("#pay-cus-id");

  selectElement.empty();
  selectElement.append('<option value="">Customer ID</option>');

  customers.forEach((customer) => {
    const option = `<option value="${customer.cusId}">${customer.cusId}</option>`;
    selectElement.append(option);
  });
}

function startForeignKeyLoad() {
  proForeignKeyInterval = setInterval(loadPropertyIDs, 1000);
  cusForeignKeyInterval = setInterval(loadCustomerIDs, 1000);
}

function stopForeignKeyLoad() {
  clearInterval(proForeignKeyInterval);
  clearInterval(cusForeignKeyInterval);
}
