import { getAllCustomer } from "../model/customerModel.js";

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

$(document).ready(function () {
  $("#cus-add").click(function () {
    console.log("click");
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

    addCustomer(cusId, appId, cusName, cusAddress, cusMobile, cusEmail);
    loadAllCustomers(getAllCustomer());
  });

  loadAllCustomers(getAllCustomer());
});
