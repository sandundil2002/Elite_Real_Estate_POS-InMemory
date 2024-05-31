import { Appointments } from "../db/db";

export function saveAppointment(appointment) {
    Appointments.push(appointment);
}
