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
  Appointments.splice(index, 1)
}