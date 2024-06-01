import {
  addAppointment,
  getAllAppointments,
} from "../model/appointmentModel.js";

$(document).ready(function () {
  $("#appo-add").click(function () {
    const appointmentArray = [
      $("#app-id").val(),
      $("#app-admin-id").val(),
      $("#app-cus-name").val(),
      $("#app-cus-mobile").val(),
      $("#app-date-time").val(),
    ];

    const [appId, adminId, name, mobile, dateTime] = appointmentArray;
    addAppointment(appId, adminId, name, mobile, dateTime);
    reloadTable(appointmentArray);
  });
  loadAllAppointments(getAllAppointments());
});

function reloadTable(appointmentArray) {
  console.log(appointmentArray);
  $("#app-tbl").append(
    "<tr>" +
      "<td>" +
      appointmentArray[0] +
      "</td>" +
      "<td>" +
      appointmentArray[1] +
      "</td>" +
      "<td>" +
      appointmentArray[2] +
      "</td>" +
      "<td>" +
      appointmentArray[3] +
      "</td>" +
      "<td>" +
      appointmentArray[4] +
      "</td>" +
      "<td>" +
      '<select name="Status" class="status-combo">' +
      '<option value="pending" class="pending">Pending</option>' +
      '<option value="complete" class="complete">Complete</option>' +
      '<option value="cancel" class="cancel">Cancel</option>' +
      "</select>" +
      "</td>" +
      "</tr>"
  );
}

function loadAllAppointments(appointments) {
  const tbody = $("#app-tbl");

  appointments.forEach((appointment) => {
    const row = `<tr>
      <td>${appointment.appId}</td>
      <td>${appointment.adminId}</td>
      <td>${appointment.name}</td>
      <td>${appointment.mobile}</td>
      <td>${appointment.dateTime}</td>
      <td>
        <select name="Status" class="status-combo">
          <option value="pending" class="pending">Pending</option>
          <option value="complete" class="complete">Complete</option>
          <option value="cancel" class="cancel">Cancel</option>
        </select>
      </td>
    </tr>`;
    tbody.append(row);
  });
}
