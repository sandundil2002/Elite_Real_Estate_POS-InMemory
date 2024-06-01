import { Appointments } from "../db/db.js";

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

export function getAllAppointments() {
  return Appointments;
}