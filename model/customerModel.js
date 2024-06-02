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

export function deleteCustomer(index) {
  Customers.splice(index, 1);
}

export function validateCustomer(customer) {
  const cusIdPattern = /^C\d{3}$/;
  const appIdPattern = /^[A-Za-z0-9-]+$/;
  const cusNamePattern = /^[A-Za-z\s]+$/;
  const addressPattern = /^[A-Za-z0-9\s,.'-]+$/;
  const cusMobilePattern = /^\d{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isCusIdValid = cusIdPattern.test(customer.cusId);
  const isAppIdValid = appIdPattern.test(customer.appId)
  const isCusNameValid = cusNamePattern.test(customer.cusName);
  const isAddressValid = addressPattern.test(customer.address);
  const isCusMobileValid = cusMobilePattern.test(customer.cusMobile);
  const isEmailValid = emailPattern.test(customer.cusEmail);

  if (!isCusIdValid) {
    alert("Invalid Customer ID");
    return false;
  }

  if (!isAppIdValid) {
    alert("Invalid Appointment ID");
    return false;
  }

  if (!isCusNameValid) {
    alert("Invalid Name");
    return false;
  }

  if (!isAddressValid) {
    alert("Invalid Address");
    return false;
  }

  if (!isCusMobileValid) {
    alert("Invalid Mobile Number");
    return false;
  }

  if (!isEmailValid) {
    alert("Invalid Email");
    return false;
  }

  return true;
}
