import {Payments,Properties,Customers,Appointments }from "../db/db.js"

export function getAllPayments(){
    return Payments;
}

export function addPayment(payment) {
  Payments.push(payment);
}

export function getAllProperties() {
    return Properties;
}

export function getAllCustomers() {
    return Customers;
}

export function getAllApointments() {
    return Appointments;
}

export function updatePropertyStatus(proId, status) {
  const property = Properties.find((prop) => prop.proId === proId);
  if (property) {
    property.status = status;
  }
}