import {
  getAllPayments,
  getAllProperties,
  getAllCustomers,
} from "../model/paymentModel.js";

let proForeignKeyInterval;
let cusForeignKeyInterval;

$(document).ready(function () {
  setLocalDateTime();
  startForeignKeyLoad();
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
  let numericPart = parseInt(lastID.slice(1));
  let newID = "O" + (numericPart + 1).toString().padStart(3, "0");
  return newID;
}

function setPaymentID() {
  const bug = 1;
  if (bug === 1) {
    const newID = generatePaymentID();
    $("#pay-id").val(newID);
    bug = 0;
    return;
  }
}

function loadPropertyIDs() {
  const properties = getAllProperties();
  const selectElement = $("#pay-pro-id");
  const priceInputElement = $("#pay-pro-price");

  selectElement.empty();
  selectElement.append('<option value="">Property ID</option>');

  properties.forEach((property) => {
    const option = `<option value="${property.proId}" data-price="${property.price}" data-type="${property.type}" data-perches="${property.perches}" data-address="${property.proAddress}">${property.proId}</option>`;
    selectElement.append(option);
  });

  selectElement.change(function () {
    const selectedOption = $(this).find("option:selected");
    const propertyPrice = selectedOption.data("price");
    priceInputElement.val(propertyPrice);
  });

  $("#pay-btn").click(function (event) {
    event.preventDefault();
    const selectedOption = $("#pay-pro-id option:selected");
    const propertyPrice = selectedOption.data("price");
    const propertyType = selectedOption.data("type");
    const propertyPerches = selectedOption.data("perches");
    const propertyAddress = selectedOption.data("address");

    const cusName = $("#pay-cus-name").val();
    const payId = $("#pay-id").val();
    const payMethod = $("#payment-method").val();

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    if (cusName.trim() === "") {
      alert("Please fill in customer field.");
      return;
    } else if (payId.trim() === "") {
      alert("Please fill in property field.");
      return;
    } else if (payMethod.trim() === "") {
      alert("Please fill in payment method.");
      return;
    }

    priceInputElement.val(propertyPrice);
    $("#bill-cus-name").html("Customer Name - " + cusName);
    $("#bill-pro-type").html("Property Type - " + propertyType);
    $("#bill-pro-perches").html("Property Perches - " + propertyPerches);
    $("#bill-pro-address").html("Property Address - " + propertyAddress);
    $("#bill-pay-id").html("Purchase ID - " + payId);
    $("#bill-pay-method").html("Payment Method - " + payMethod);
    $("#bill-pay-date").html("Date - " + date);
    $("#bill-pay-time").html("Time - " + time);

    const tax = propertyPrice * 0.05;
    const total = propertyPrice + tax;

    $("#bill-tbl-price").html("LKR : " + propertyPrice);
    $("#bill-tbl-tax").html("LKR : " + tax);
    $("#bill-tbl-total").html("LKR : " + total);

    setPaymentID();
  });
}

function loadCustomerIDs() {
  const customers = getAllCustomers();
  const selectElement = $("#pay-cus-id");
  const cusInputElement = $("#pay-cus-name");

  selectElement.empty();
  selectElement.append('<option value="">Customer ID</option>');

  customers.forEach((customer) => {
    const option = `<option value="${customer.cusId}" data-name="${customer.cusName}"> ${customer.cusId}</option>`;
    selectElement.append(option);
  });

  selectElement.change(function () {
    const selectedOption = $(this).find("option:selected");
    const customerName = selectedOption.data("name");
    cusInputElement.val(customerName);
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

$("#clear-btn").click(function () {
  $("#pay-pro-id").val("");
  $("#pay-pro-price").val("");
  $("#pay-cus-id").val("");
  $("#pay-cus-name").val("");
  $("#payment-method").val("");
});
