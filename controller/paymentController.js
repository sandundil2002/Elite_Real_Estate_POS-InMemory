$(document).ready(function () {
  setLocalDateTime();
  setPaymentID();
  setTimeout(setLocalDateTime(), 60000);
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
  const properties = getAllAppointments();
  const selectElement = $("#cus-app-id");

  selectElement.empty();
  selectElement.append('<option value="">Appointment ID</option>');

  appointments.forEach((appointment) => {
    const option = `<option value="${appointment.appId}">${appointment.appId}</option>`;
    selectElement.append(option);
  });
}