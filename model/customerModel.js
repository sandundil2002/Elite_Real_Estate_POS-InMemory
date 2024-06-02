import { Customers, Appointments } from "../db/db.js";

export function getAllAppointments() {
  return Appointments;
}

export function getAllCustomers() {
  return Customers;
}

export function addCustomer(cusId,appId,cusName,cusAddress,cusMobile,cusEmail) {
  const newCustomer = {
    cusId: cusId,
    appId:appId,
    cusName:cusName,
    cusAddress: cusAddress,
    cusMobile:cusMobile,
    cusEmail: cusEmail
};
  Customers.push(newCustomer);
}

export function updateCustomer(index, updatedCustomer) {
  Customers[index] = updatedCustomer;
}