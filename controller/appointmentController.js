let id = (document.getElementById("app-id").value = "A00-001");

function saveAppointment() {
  const adminSelect = document.getElementById("admin-id");
  const nameInput = document.getElementById("name");
  const mobileInput = document.getElementById("mobile");
  const dateTimeInput = document.getElementById("date-time");

  const adminIdValue = adminSelect.value;
  const nameValue = nameInput.value;
  const mobileValue = mobileInput.value;
  const dateTimeValue = dateTimeInput.value;

  const appointmentValues = [
    id,
    adminIdValue,
    nameValue,
    mobileValue,
    dateTimeValue,
  ];

  console.log(appointmentValues);
}
