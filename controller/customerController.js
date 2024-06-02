import {
  getAllCustomers,
  getAllAppointments,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  validateCustomer
} from "../model/customerModel.js";

let foreignKeyInterval;

$(document).ready(function () {
  loadAllCustomers(getAllCustomers());
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

function updateTable(index, updatedCustomer) {
  const tableBody = $("#cus-tbl");
  const row = tableBody.find("tr").eq(index);

  row.find("td").eq(0).text(updatedCustomer.cusId);
  row.find("td").eq(1).text(updatedCustomer.appId);
  row.find("td").eq(2).text(updatedCustomer.name);
  row.find("td").eq(3).text(updatedCustomer.address);
  row.find("td").eq(4).text(updatedCustomer.mobile);
  row.find("td").eq(5).text(updatedCustomer.email);
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

  const [cusId, appId, cusName, cusAddress, cusMobile, cusEmail] =
    customerArray;

  if (checkValidation()) {
      addCustomer(cusId, appId, cusName, cusAddress, cusMobile, cusEmail);
      reloadTable(customerArray);
      setCustomerID()
  }
});

$("#cus-update").click(function () {
  const cusId = $("#cus-id").val();

  const index = getAllCustomers().findIndex(
    (customer) => customer.cusId === cusId
  );

  if (index !== -1) {
    const updatedCustomer = {
      cusId: cusId,
      appId: $("#cus-app-id").val(),
      name: $("#cus-name").val(),
      address: $("cus-address").val(),
      mobile: $("#cus-mobile").val(),
      email: $("#cus-email").val(),
    };

    if (checkValidation()) {
       updateCustomer(index, updatedCustomer);
       updateTable(index, updatedCustomer);
    }
  }
});

$("#cus-search").click(function () {
  const cusId = $("#cus-id").val();

  const index = getAllCustomers().findIndex(
    (customer) => customer.cusId === cusId
  );

  if (index !== -1) {
    const customer = getAllCustomers()[index];
    console.log(customer);
    $("#cus-app-id").val(customer.appId.trim());
    $("#cus-name").val(customer.cusName.trim());
    $("#cus-address").val(customer.address.trim());
    $("#cus-mobile").val(customer.cusMobile.trim());
    $("#cus-email").val(customer.cusEmail.trim());
    stopForeignKeyLoad();
    setTimeout(startForeignKeyLoad, 20000);
  } else {
    alert("Customer Not Found");
  }
});

$("#cus-delete").click(function () {
  const cusId = $("#cus-id").val();

  const index = getAllCustomers().findIndex(
    (customer) => customer.cusId === cusId
  );

  if (index !== -1) {
    deleteCustomer(index);
    const tbody = $("#cus-tbl");
    tbody.empty();
    loadAllCustomers(getAllCustomers());
  } else {
    alert("Customer Not Found");
  }
});

function checkValidation() {
  const customer = {
    cusId: $("#cus-id").val(),
    appId: $("#cus-app-id").val(),
    cusName: $("#cus-name").val(),
    cusAddress: $("#cus-address").val(),
    cusMobile: $("#cus-mobile").val(),
    cusEmail: $("#cus-email").val(),
  };

  return validateCustomer(customer);
}

function startForeignKeyLoad() {
  foreignKeyInterval = setInterval(loadAppointmentIDs, 1000);
}

function stopForeignKeyLoad() {
  clearInterval(foreignKeyInterval);
}
