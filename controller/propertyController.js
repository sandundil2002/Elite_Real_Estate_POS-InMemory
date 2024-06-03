import {
  getAllProperties,
  getAllAgents,
  addProperty,
  updateProperty,
  deleteProperty,
  validateProperty,
} from "../model/PropertyModel.js";

let foreignKeyInterval;

$(document).ready(function () {
  loadAllProperties(getAllProperties());
  loadAgentsIDs();
  startForeignKeyLoad();

  $("#pro-age-id").on("change", function () {
    stopForeignKeyLoad();
    setTimeout(startForeignKeyLoad, 20000);
  });
});

function generatePropertyID() {
  let lastID = $("#pro-id").val();

  if (!lastID) {
    lastID = "P000";
  }

  let newID = "P" + (parseInt(lastID.slice(1)) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastProID", newID);
  return newID;
}

function setPropertyID() {
  const newID = generatePropertyID();
  $("#pro-id").val(newID);
}

function loadAgentsIDs() {
  const agents = getAllAgents();
  const selectElement = $("#pro-age-id");

  selectElement.empty();
  selectElement.append('<option value="">Supplier ID</option>');

  agents.forEach((agent) => {
    const option = `<option value="${agent.ageId}">${agent.ageId}</option>`;
    selectElement.append(option);
  });
}

function loadAllProperties(properties) {
  const tbody = $("#pro-tbl");

  properties.forEach((properties) => {
    const row = `<tr>
      <td>${properties.proId}</td>
      <td>${properties.ageId}</td>
      <td>${properties.type}</td>
      <td>${properties.proAddress}</td>
      <td>${properties.price}</td>
      <td>${properties.perches}</td>
    </tr>`;
    tbody.append(row);
  });
}

function reloadTable(propertyArray) {
  $("#pro-tbl").append(
    "<tr>" +
      "<td>" +
      propertyArray[0] +
      "</td>" +
      "<td>" +
      propertyArray[1] +
      "</td>" +
      "<td>" +
      propertyArray[2] +
      "</td>" +
      "<td>" +
      propertyArray[3] +
      "</td>" +
      "<td>" +
      propertyArray[4] +
      "</td>" +
      "<td>" +
      propertyArray[5] +
      "</td>" +
      "</tr>"
  );
}

function updateTable(index, updatedProperty) {
  const tableBody = $("#pro-tbl");
  const row = tableBody.find("tr").eq(index);

  row.find("td").eq(0).text(updatedProperty.proId);
  row.find("td").eq(1).text(updatedProperty.ageId);
  row.find("td").eq(2).text(updatedProperty.type);
  row.find("td").eq(3).text(updatedProperty.proAddress);
  row.find("td").eq(4).text(updatedProperty.price);
  row.find("td").eq(5).text(updatedProperty.perches);
}

$("#pro-add").click(function () {
  const propertyArray = [
    $("#pro-id").val(),
    $("#pro-age-id").val(),
    $("#property-type").val(),
    $("#pro-address").val(),
    $("#price").val(),
    $("#perches").val(),
  ];

  const [proId, ageId, type, proAddress, price, perches] = propertyArray;

  if (checkValidation()) {
    addProperty(proId, ageId, type, proAddress, price, perches);
    reloadTable(propertyArray);
    setPropertyID();
  }
});

$("#pro-update").click(function () {
  const proId = $("#pro-id").val();

  const index = getAllProperties().findIndex(
    (property) => property.proId === proId
  );

  if (index !== -1) {
    const updatedProperty = {
      proId: proId,
      ageId: $("#pro-age-id").val(),
      type: $("#property-type").val(),
      proAddress: $("pro-address").val(),
      price: $("#price").val(),
      perches: $("#perches").val(),
    };

    if (checkValidation()) {
      updateProperty(index, updatedProperty);
      updateTable(index, updatedProperty);
    }
  }
});

$("#pro-search").click(function () {
  const proId = $("#pro-id").val();

  const index = getAllProperties().findIndex(
    (property) => property.proId === proId
  );

  if (index !== -1) {
    const property = getAllProperties()[index];
    $("#pro-age-id").val(property.ageId.trim());
    $("#property-type").val(property.type.trim());
    console.log(property.type.trim());
    $("#pro-address").val(property.proAddress.trim());
    $("#price").val(property.price.trim());
    $("#perches").val(property.perches.trim());
    stopForeignKeyLoad();
    setTimeout(startForeignKeyLoad, 20000);
  } else {
    alert("Property Not Found");
  }
});

function checkValidation() {
  const property = {
    proId: $("#pro-id").val(),
    ageId: $("#pro-age-id").val(),
    proAddress: $("#pro-name").val(),
    price: $("#price").val(),
    perches: $("#perches").val()
  };

  return validateProperty(property);
}

function startForeignKeyLoad() {
  foreignKeyInterval = setInterval(loadAgentsIDs, 1000);
}

function stopForeignKeyLoad() {
  clearInterval(foreignKeyInterval);
}
