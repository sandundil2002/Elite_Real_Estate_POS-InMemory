import {
  getAllProperties,
  getAllAgents,
  addProperty,
  updateProperty,
  deleteProperty,
  validateProperty,
} from "../model/PropertyModel.js";

$(document).ready(function () {
  loadAllProperties(getAllProperties());

  $("#cus-app-id").on("change", function () {
    stopForeignKeyLoad();
    setTimeout(startForeignKeyLoad, 20000);
  });
});

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