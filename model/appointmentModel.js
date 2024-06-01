import { Appointments } from "../db/db.js";

export function getAllAppointments() {
  return Appointments;
}

export function addAppointment(appId, adminId, name, mobile, dateTime) {
  const newAppointment = {
    appId: appId,
    adminId: adminId,
    name: name,
    mobile: mobile,
    dateTime: dateTime,
  };
  Appointments.push(newAppointment);
}

export function updateAppointment(index, updatedAppointment) {
  Appointments[index] = updatedAppointment;
}

export function deleteAppointment(index) {
  Appointments.splice(index, 1);
}

export function validateAppointment(appointment) {
  const appIdPattern = /^A\d{3}$/;
  const adminIdPattern = /^[A-Za-z0-9-]+$/;
  const namePattern = /^[A-Za-z\s]+$/;
  const mobilePattern = /^\d{9}$/;
  const dateTimePatten = /^\d{4}/;

  const isAppIdValid = appIdPattern.test(appointment.appId);
  const isAdminIdValid = adminIdPattern.test(appointment.adminId);
  const isNameValid = namePattern.test(appointment.name);
  const isMobileValid = mobilePattern.test(appointment.mobile);
  const isDateTime = dateTimePatten.test(appointment.dateTime);

  if (!isAppIdValid) {
    alert("Invalid Appointment ID");
    return false;
  }

  if (!isAdminIdValid) {
    alert("Invalid Admin ID!");
    return false;
  }

  if (!isNameValid) {
    alert("Invalid Name");
    return false;
  }

  if (!isMobileValid) {
    alert("Invalid Mobile Number");
    return false;
  }

  if (!isDateTime) {
    alert("Please Input Date & Time");
    return false;
  }

  return true;
}
